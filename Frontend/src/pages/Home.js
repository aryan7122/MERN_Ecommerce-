import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
// import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
// import { services } from "../utils/Data";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
// import wishlist from "../images/wishlist.svg";
// import watch from "../images/watch.jpg";
// import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/products/productSlilce";
import ReactStars from "react-rating-stars-component";
import { addToWishlist } from "../features/products/productSlilce";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import MainCarousel from "./HomeCarousel/MainCarousel";
// import HomeScetionCarousel from "./HomeSectionCarousel/HomeScetionCarousel";
// import { Data_all } from '../pages/HomeSectionCarousel/Data_all'

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product?.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getblogs = useCallback(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const getProducts = useCallback(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    getblogs();
    getProducts();
  }, [getblogs, getProducts]);

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  return (
    <>
      <MainCarousel />
      <div className=' '>
        {/* <HomeScetionCarousel mens_kurta_data={Data_all} sectionName={"Men's Kurta"} /> */}
      </div>

      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {productState &&
            productState.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card hover:shadow-md h-[400px] p-2 position-relative overflow-hidden">
                      <div className="overflow-hidden">
                        <img
                          src={item?.images[0]?.url}
                          alt="product "
                          onClick={() => navigate("/product/" + item?._id)}
                          className="w-full h-[300px] object-cover object-top hover:scale-110 rounded-md"
                        />
                        <span className="absolute -mt-7 pl-1">
                          <ReactStars
                            count={5}
                            size={14}
                            value={item?.totalrating.toString()}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </span>
                      </div>
                      <div className="product-details pt-2">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <p className="price">Rs. {item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute bg-white p-2 -mr-5 -mt-14 rounded-l-md">
                        <button className="border-0 bg-transparent">
                          <img
                            src={wish}
                            alt="wishlist"
                            onClick={() => addToWish(item?._id)}
                          />
                        </button>
                        <div className="d-flex flex-column gap-15">
                          <button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                          </button>
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null; // Ensure the function returns a value
            })}
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    img={item?.images[0].url}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                );
              }
              return null; // Ensure the function returns a value
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                          <img
                            src={wish}
                            alt="wishlist"
                            onClick={() => addToWish(item?._id)}
                          />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0].url}
                          alt="product "
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                        <img
                          src={item?.images[0].url}
                          alt="product "
                          height={"250px"}
                          width={"100%"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalrating.toString()}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="price">Rs. {item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                          </button> */}
                          {/* <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button> */}
                          {/* <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null; // Ensure the function returns a value
            })}
        </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            {/* <h3 className="section-heading">Our Latest Blogs</h3> */}
          </div>
        </div>
        <div className="row">
          {blogState &&
            blogState.map((item, index) => {
              if (index < 4) {
                return (
                  <div className="col-3 " key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              }
              return null; // Ensure the function returns a value
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;