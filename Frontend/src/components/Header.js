import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlilce";
import { getUserCart } from "../features/user/userSlice";
import userimg from './user.gif';
import { IoLogOutOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const [total, setTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const productState = useSelector((state) => state?.product?.product);
  const [showHiddenContent, setShowHiddenContent] = useState(false);
  const toggleHiddenContent = () => {
    setShowHiddenContent(prevState => !prevState);
  };
  const handleClick = () => {
    // Navigate to the product detail page when the product is clicked
    navigate('/OrderHistory'); // Replace ':productId' with the actual product ID
  };
  const navigate = useNavigate();

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  const [productOpt, setProductOpt] = useState([]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <header className="shadow-lg  py-3 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30 justify-between flex content-center ">
                <h2>
                  <Link className="text-black" to="/">
                    <img style={{ height: '40px' }} src='https://www.prideindustries.com/wp-content/uploads/2021/06/Customer-logo_Amazon-1-768x384.png.webp' alt="" />
                  </Link>
                </h2>
                {/* <div className="">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className=" d-inline-block">
                         Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {productState &&
                        productState.map((item, index) => {
                          return (
                            <li key={index}>
                              <Link className="dropdown-item text-white" to="">
                                {item?.category}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div> */}
                {/* <div className="flex  menu-links ">
                  <div className="flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {authState?.user !== null ? (
                      <button
                        className="border border-0 bg-trasparent text-white text-uppercase"
                        type="button"
                        style={{ backgroundColor: "#232f3e" }}
                        onClick={handleLogout}
                      >
                        LogOut
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                
                </div> */}
                <div className="flex gap-5">
                  {/* searchbar */}
                  <div className="input-group w-[400px]">
                    <Typeahead
                      id="pagination-example"
                      onPaginate={() => console.log("Results paginated")}
                      onChange={(selected) => {
                        navigate(`/product/${selected[0]?.prod}`);
                        dispatch(getAProduct(selected[0]?.prod));
                      }}
                      options={productOpt}
                      paginate={paginate}
                      labelKey={"name"}
                      placeholder="Search for Products here"
                    />
                    <span className="input-group-text p-3" id="basic-addon2">
                      <BsSearch className="fs-6" />
                    </span>
                  </div>
                  {/* searchbar */}
                  {/* like */}
                  <div>
                    <Link
                      to="/wishlist"
                      className=" text-red-600 text-3xl pt-2"
                    >
                      {/* <img src={wishlist} alt="wishlist" /> */}
                      <FaHeart />
                      {/* <p className="mb-0">
                      Favourite <br /> wishlist
                    </p> */}
                    </Link>
                  </div>
                  {/* like */}
                  {/* cart */}
                  <div className="flex">
                    <Link
                      to="/cart"
                      className="flex gap-2 "
                    >
                      <img src={cart} alt="cart" />
                      <div className="">
                        <span className=" text-red-100">
                          {cartState?.length ? cartState?.length : 0}
                        </span>
                        <p className="mb-0">
                          {/* Rs. {!cartState?.length ? 0 : total ? total : 0} */}
                        </p>
                      </div>
                    </Link>
                  </div>
                  {/* cart */}
                  <div className="  flex content-center ">
                    <div className="  align-content-center justify-center scale-[1.6] cursor-pointer text-xl" onClick={toggleHiddenContent}>
                      <img
                        className="h-8 w-auto"
                        src={userimg}
                        alt=""
                      />
                    </div>
                    {showHiddenContent && (
                      <div className="absolute shadow-lg  content-center   mt-16 gap-2  z-40 translate-x-20 bg-white text-black flex-column  flex align-content-center justify-center p-1 rounded-sm w-[150px] h-fit -ml-40 cursor-pointer text-xl">
                        <div className=" gap-4 " onClick={toggleHiddenContent}>
                          <div className="hover:shadow-md p-1">
                            <Link
                              to={authState?.user === null ? "/login" : "my-profile"}
                              className=""
                            >
                              {authState?.user === null ? (
                                <p className="">
                                  Log in
                                </p>
                              ) : (
                                <p className="">
                                  Profile: {authState?.user?.firstname}
                                </p>
                              )}
                            </Link>
                          </div>
                          <div className="hover:shadow-md p-1">
                            <NavLink to="/">Home</NavLink>
                          </div>
                          <div className="hover:shadow-md p-1">
                            <NavLink to="/product">Our Store</NavLink>
                          </div>
                          <div className="hover:shadow-md p-1">
                            <NavLink to="/my-orders">My Orders</NavLink>
                          </div>
                          <div className="hover:shadow-md p-1">
                            <NavLink to="/contact">Contact</NavLink>
                          </div>
                          <div className="hover:shadow-md p-1 mb-1 ">
                            {authState?.user !== null ? (
                              <button
                                className=" flex  content-center gap-2"
                                type="button"
                                onClick={handleLogout}
                              >
                                LogOut
                                <span className="pt-1">
                                  <IoLogOutOutline />
                                </span>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
