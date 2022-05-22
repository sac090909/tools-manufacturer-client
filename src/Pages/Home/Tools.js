import React, { useEffect, useState } from "react";
import Tool from "./Tool";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const Tools = () => {
  const { data: tools, isLoading } = useQuery(["toolsQuery"], () =>
    fetch(`http://localhost:5001/tools`).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  //   const [tools, setTools] = useState([]);
  //   useEffect(() => {
  //     fetch("http://localhost:5001/tools")
  //       .then((res) => res.json())
  //       .then((data) => setTools(data));
  //   }, []);

  return (
    <div>
      <h3 className="text-center my-8 text-3xl">Tools We Manufacture</h3>
      <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1 justify-items-center">
        {tools.slice(0, 3).map((tool, index) => (
          <Tool key={index} tool={tool}></Tool>
        ))}
      </div>
    </div>
  );
};

export default Tools;
