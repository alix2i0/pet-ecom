import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/orders/${id}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 h-screen">
      <div className="p-3 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg">
          <h2 className="text-xl mb-5">Order Details</h2>
          <div className="flex flex-col justify-between items-center mb-4">

                <h2 className="px-6 py-3 text-3xl">{order.customer.username}&apos;s Order</h2>
              
                <div className="px-6 py-3 w-full">
                  {/* <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Product Name</th>
                        <th className="text-left">Quantity</th>
                        <th className="text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product) => (
                        <tr key={product._id}>
                          <td>{product.product.name}</td>
                          <td>x{product.quantity}</td>
                          <td>${product.product.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                      <tr className=" text-center bg-gray-100 dark:bg-gray-800">
                        <th
                          scope="col"
                          class="px-6 py-3 "
                        >
                          Product name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 "
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 "
                        >
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {order.products.map((product) => (
                      <tr key={product._id} class="border-b text-center bg-gray-50 hover:bg-gray-100">
                        <td
                          scope="row"
                          class="px-6 py-4 text-gray-900 whitespace-nowrap "
                        >
                          {product.product.name}
                        </td>
                        <td class="px-6 py-4 ">
                          ${product.product.price}
                        </td>
                        <td class="px-6 py-4 ">
                          {product.quantity}
                        </td>
                      </tr>))}
                    </tbody>
                  </table>
                </div>
              
              <div className="text-md text-gray-700 flex items-center justify-center ">
                <h2>Total Amount:</h2>
                <div className="px-6 py-3 font-bold">${order.totalAmount}</div>
              </div>
                <div className="flex items-center justify-center gap-5">
                <h2>Payment status: </h2>
                  <div
                    className={`py-1 flex justify-center rounded-3xl px-4 ${
                      order.status === "Pending"
                        ? "bg-yellow-400/30 text-orange-400"
                        : order.status === "Completed"
                        ? "bg-green-500/30 text-green-500"
                        : order.status === "Rejected" ||
                          order.status === "Stock Not Available"
                        ? "bg-red-500/30 text-red-500"
                        : "bg-black"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
            
                <div className="px-6 py-3 flex items-center justify-center gap-5">
                <h2>Order Date: </h2>
                <div className="px-6 py-3">{new Date(order.orderDate).toLocaleString()}</div>
                </div>
          </div>
          <div className="flex justify-end">
            <Link
              className="p-2.5 ms-2 text-center w-[70px] text-sm font-medium text-white bg-primary rounded-lg border border-primary hover:bg-secondary focus:ring-4 focus:outline-none"
              to="/orders"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
