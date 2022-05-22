import React from "react";
import banner from "../../assets/images/banner-2.jpg";

const Banner = () => {
  return (
    <div className="flex justify-center">
      <img className="drop-shadow-lg rounded " src={banner} alt="" />
    </div>
  );
};

export default Banner;
