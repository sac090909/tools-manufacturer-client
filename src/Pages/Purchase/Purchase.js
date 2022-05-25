import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";

const Purchase = () => {
  const { toolsId } = useParams();

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

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

  const onSubmit = (data, event) => {
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
        if (result.insertedId) {
          toast("WOW ! Order has been added, Now in My Order page. Thank You!");
          navigate("/dashboard");
        } else {
          toast("Sorry, having trouble to add the order!");
        }
        event.target.reset();
      });
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">
            Purchase Order Detail
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">User Information </span>
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
              <div>
                <label className="input-group mt-1 mb-6">
                  <span>Address</span>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="address"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Address is Required",
                      },
                      maxLength: {
                        value: 75,
                        message: "Max length 75",
                      },
                      pattern: {
                        value: /^\s*\S[\s\S]*$/,
                        message: "Blank is not allowed",
                      },
                    })}
                  />
                </label>
                <label className="label">
                  {errors.address?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.address.message}
                    </span>
                  )}
                  {errors.address?.type === "maxLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.address.message}
                    </span>
                  )}
                  {errors.address?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.address.message}
                    </span>
                  )}
                </label>
              </div>

              <label className="label">
                <span className="label-text font-bold">Item Information </span>
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
              <div>
                <label className="input-group mt-1">
                  <span>Order</span>
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-xs"
                    placeholder={`min ${tool.minOrderQuantity} to max ${tool.availableQuantity}`}
                    {...register("orderedQuantity", {
                      required: {
                        value: true,
                        message: "Order quantity is Required",
                      },
                      min: {
                        value: `${tool.minOrderQuantity}`,
                        message: `Min value is ${tool.minOrderQuantity} `,
                      },
                      max: {
                        value: `${tool.availableQuantity}`,
                        message: `Max value is ${tool.availableQuantity}`,
                      },
                    })}
                  />
                </label>
                <label className="label">
                  {errors.orderedQuantity?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.orderedQuantity.message}
                    </span>
                  )}
                  {errors.orderedQuantity?.type === "min" && (
                    <span className="label-text-alt text-red-500">
                      {errors.orderedQuantity.message}
                    </span>
                  )}
                  {errors.orderedQuantity?.type === "max" && (
                    <span className="label-text-alt text-red-500">
                      {errors.orderedQuantity.message}
                    </span>
                  )}
                </label>
              </div>
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
