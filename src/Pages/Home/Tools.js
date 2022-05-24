import Tool from "./Tool";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const Tools = () => {
  const {
    data: tools,
    isLoading,
    refetch,
  } = useQuery(["toolsQuery"], () =>
    fetch(`http://localhost:5001/tools`).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  // const { data: tools, isLoading } = useQuery(["toolsQuery"], () =>
  //   fetch(`http://localhost:5001/tools`).then((res) => res.json())
  // );

  return (
    <div>
      <h3 className="text-center my-24 text-3xl font-bold">
        Tools We Manufacture
      </h3>
      <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1 justify-items-center">
        {tools?.slice(0, 3).map((tool) => (
          <Tool key={tool._id} tool={tool} refetch={refetch}></Tool>
        ))}
      </div>
    </div>
  );
};

export default Tools;
