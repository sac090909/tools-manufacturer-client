import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [user, loading] = useAuthState(auth);
  const email = user?.email;

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["myOrders", email], () =>
    fetch(`http://localhost:5001/purchase?user=${email}`).then((res) =>
      res.json()
    )
  );

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  const handleCancelPurchaseOrder = (orderId) => {
    console.log(orderId);
    if (orderId) {
      const url = `http://localhost:5001/purchase/${orderId}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            toast("Order Canceled !");
            refetch();
          }
        });
    }
    refetch();
  };

  return (
    <div className="overflow-x-auto mx-2">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Sl</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Order Id</th>
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
            <tr key={order._id}>
              <th>{index}</th>
              <td>{order?.displayName}</td>
              <td>{order?.email}</td>
              <td>{order?._id}</td>
              <td>{order?.name}</td>
              <td>{order?.orderedQuantity}</td>
              <td>$ {order?.unitPrice}</td>
              <td>$ {order?.totalCost}</td>
              <td>
                <div>
                  <label htmlFor="my-modal-6" className="btn modal-button">
                    Cancel
                  </label>

                  <input
                    type="checkbox"
                    id="my-modal-6"
                    className="modal-toggle"
                  />
                  <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                      <div className="modal-action">
                        <label
                          htmlFor="my-modal-6"
                          className="btn btn-sm btn-circle absolute right-6 top-2"
                        >
                          ✕
                        </label>
                      </div>
                      <h3 className="font-bold text-lg">
                        {order?.displayName} , <br /> Are you sure to cancle the
                        order?
                      </h3>
                      <p className="py-4">
                        {order?._id} : {order?.name}
                      </p>

                      <div className="modal-action">
                        <label
                          htmlFor="my-modal-6"
                          className="btn"
                          onClick={() => handleCancelPurchaseOrder(order._id)}
                        >
                          YES
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
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
