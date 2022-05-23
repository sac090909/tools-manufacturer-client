import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const Purchase = () => {
  const { toolsId } = useParams();

  const [user, loading] = useAuthState(auth);

  console.log(user);

  // const [tool, setTool] = useState({});

  // useEffect(() => {
  //   const url = `http://localhost:5001/tools/${toolsId}`;
  //   console.log(url);
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => setTool(data));
  // }, [toolsId]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: tool, isLoading } = useQuery(["toolsQuery", toolsId], () =>
    fetch(`http://localhost:5001/tools/${toolsId}`).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const onSubmit = (data) => {
    console.log(data);
    const orderedQuantity = parseInt(data.orderedQuantity);
    const availableQuantity = parseInt(data.availableQuantity);
    const unitPrice = parseInt(data.unitPrice);
    const totalCost = orderedQuantity * unitPrice;

    const newData = Object.assign({}, data, {
      orderedQuantity: orderedQuantity,
      availableQuantity: availableQuantity,
      unitPrice: unitPrice,
      totalCost: totalCost,
    });

    const url = `http://localhost:5001/purchase`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    // <div>
    //   <h2> Tool name {tool.name}</h2>
    //   <div className="text-center">
    //     <Link to="/checkout">
    //       <button className="btn btn-primary">Proceed Checkout</button>
    //     </Link>
    //   </div>
    // </div>

    <div className="flex justify-center items-center mt-8">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Purchase Detail</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">User Information </span>
              </label>

              <label className="input-group mt-1">
                <span>Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={user?.displayName}
                  {...register("displayName")}
                />
              </label>

              <label className="input-group mt-1">
                <span>Email</span>
                <input
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  value={user?.email}
                  {...register("email")}
                />
              </label>

              <label className="input-group mt-1 mb-6">
                <span>Address</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="address"
                  {...register("address")}
                />
              </label>

              <label className="label">
                <span className="label-text">Item Information </span>
              </label>

              <label className="input-group mt-1">
                <span>Id</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={tool?._id}
                  {...register("id")}
                />
              </label>
              <label className="input-group mt-1">
                <span>Tool</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={tool?.name}
                  {...register("name")}
                />
              </label>

              <label className="input-group mt-1">
                <span>Price</span>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                  value={tool.unitPrice}
                  {...register("unitPrice")}
                />
              </label>

              <label className="input-group mt-1">
                <span>Available</span>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                  value={tool.availableQuantity}
                  {...register("availableQuantity")}
                />
              </label>

              <label className="input-group mt-1">
                <span>Order</span>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                  placeholder={`min order quantity ${tool.minOrderQuantity}`}
                  {...register("orderedQuantity")}
                />
              </label>
            </div>
            <input
              className="btn w-full max-w-xs text-white mt-2"
              type="submit"
              value="Submit Order"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
