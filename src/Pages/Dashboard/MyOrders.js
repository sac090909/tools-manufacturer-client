import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MyOrders = () => {
  const [user] = useAuthState(auth);

  const { data: orders, isLoading } = useQuery(["myOrders", user], () =>
    fetch(`http://localhost:5001/purchase?user=${user.email}`).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div class="overflow-x-auto">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th>Sl</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Item Name</th>
            <th>Ordered Qty</th>
            <th>Unit Price</th>
            <th>Total Cost</th>
            <th>Cancel Order</th>
            <th>Payment Status</th>
            <th>Payment Id</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr>
              <th>{index + 1}</th>
              <td>{order.displayName}</td>
              <td>{order.email}</td>
              <td>{order.name}</td>
              <td>{order.orderedQuantity}</td>
              <td>{order.unitPrice}</td>
              <td>{order.totalCost}</td>
              <td>Cancel</td>
              <td>Pay</td>
              <td>xxxx</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
