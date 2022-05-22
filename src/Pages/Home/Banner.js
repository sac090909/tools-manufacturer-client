import React from "react";
import banner from "../../assets/images/banner-3.jpg";

const Banner = () => {
  return (
    <div className="flex justify-center">
      <img className="shadow-lg " src={banner} alt="" />
    </div>
  );
};

export default Banner;
