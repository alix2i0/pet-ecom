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
            <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <tr className="text-md text-gray-700  bg-gray-100">
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <td className="px-6 py-3">{order.customer.username}</td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th scope="col" className="px-6 py-3">
                  Products
                </th>
                <td className="px-6 py-3">
                  <ul>
                    {order.products.map((product) => (
                      <li key={product._id}>
                        {product.product.name} x{product.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th scope="col" className="px-6 py-3 truncate">
                  Total Amount
                </th>
                <td className="px-6 py-3">{order.totalAmount}</td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th>Status</th>
                <td className="px-6 py-3">{order.status}</td>
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
            class="p-2.5 ms-2 text-center w-[70px] text-sm font-medium text-white bg-teal-400 rounded-lg border border-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none"
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
