import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center">
      <progress
        className="progress progress-primary w-56 mt-8"
        value="40"
        max="100"
      ></progress>
    </div>
  );
};

export default Loading;
