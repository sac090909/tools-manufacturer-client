import React from "react";
import { useQuery } from "react-query";

import Loading from "../Shared/Loading";
import Review from "./Review";

const Reviews = () => {
  const { data: reviews, isLoading } = useQuery(["reviewsQuery"], () =>
    fetch(`http://localhost:5001/reviews`).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-center my-8 text-3xl">Reviews {reviews.length}</h3>

      <div className="flex flex-row justify-center gap-24 flex-wrap">
        {reviews?.map((review) => (
          <Review key={review._id} review={review}></Review>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
