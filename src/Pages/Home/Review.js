import React from "react";
import reviewsbg from "../../../src/assets/images/reviews-bg-1.jpg";

const Review = ({ review }) => {
  const { displayName, rating } = review;
  return (
    <div className="card w-96 hover:bg-violet-400 shadow-xl ">
      {/* <figure>
        <img src={reviewsbg} alt="" />
      </figure> */}
      <div className="card-body items-center text-center">
        <h2 className="card-title font-mono mb-4">{displayName}</h2>
        <p className="font-mono">{review?.comment}</p>
        <div className="card-actions justify-start">
          <button className="btn btn-ghost font-mono">Rating: {rating} </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
