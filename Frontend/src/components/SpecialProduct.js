import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
  const { title, brand, totalrating, price, sold, quantity, id, img } = props;

  console.log(id);
  console.log(sold)
  return (
    <div className="p-2 flex-1   ">
      <div className="bg-white p-2 hover:shadow-2xl  rounded-md  w-[313px] h-fit shadow-md">
        <Link className="" to={"/product/" + id}>
          <div className=" w-[300px] h-[330px] border">
            <div className="absolute pl-2 text-md pt-1">
              <ReactStars
                count={5}
                size={14}
                value={totalrating}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <img
              src={img}
              className="rounded-md w-[300px] h-[330px] object-cover object-top"
              alt="watch"
            />
          </div>
          <div className=" pt-2">

            <h5 className="brand pb-2">{brand}</h5>
            <h6 className="title">{title?.substr(0, 40) + "..."}</h6>
            <p className="price">
              <div className="flex justify-between">
                <span className="">Rs {price}</span> &nbsp;{" "}
                <strike>Rs {Math.floor(price * 1.31)}</strike>
              </div>
            </p>
            {/* <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>5 </b>days
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>
                </div>
              </div> */}
            {/* <div className="flex progress">
            <div className="pr-2 progress-bar">
              <p>Products: {quantity}</p>
            </div>
            <div className="prod-count my-3 border ">
              <div className="progress  ">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: quantity / quantity + sold * 100 + "%" }}
                  aria-valuenow={quantity / quantity + sold * 100}
                  aria-valuemin={quantity}
                  aria-valuemax={sold + quantity}
                ></div>
              </div>
            </div>
          </div> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SpecialProduct;
