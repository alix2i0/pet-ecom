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
          <div className="flex justify-between items-center mb-4">
            <table className="text-center text-md w-full rtl:text-right text-gray-500 dark:text-gray-400">
              <tr className="text-md text-gray-700  bg-gray-100">
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <td className="px-6 py-3 text-3xl">{order.customer.username}</td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th scope="col" className="px-6 py-3">
                  Products
                </th>
                <td className="px-6 py-3">
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
                      <tr className=" text-center">
                        <th
                          scope="col"
                          class="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                        >
                          Product name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                        >
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {order.products.map((product) => (
                      <tr  key={product._id} class="border-b text-center border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          {product.product.name}
                        </th>
                        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          ${product.product.price}
                        </td>
                        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {product.quantity}
                        </td>
                      </tr>))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th scope="col" className="px-6 py-3 truncate">
                  Total Amount
                </th>
                <td className="px-6 py-3 font-bold">${order.totalAmount}</td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th>Payement Status</th>
                <td className="flex items-center justify-center">
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
                </td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th>Date</th>
                <td className="px-6 py-3">
                  {new Date(order.orderDate).toLocaleString()}
                </td>
              </tr>
            </table>
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
