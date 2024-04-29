import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5); // Default limit
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term
  const [sortBy, setSortBy] = useState(""); // State to hold current sorting option
  const [sortOrder, setSortOrder] = useState(1); // State to hold sorting order (1 for ascending, -1 for descending)
  const [selectedStatus, setSelectedStatus] = useState({});

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3300/api/orders?page=${currentPage}&limit=${limit}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, limit, searchTerm, sortBy, sortOrder]);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this order?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:3300/api/orders/${id}`);
        fetchOrders();
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      // If already sorting by the same key, toggle the sorting order
      setSortOrder(sortOrder === 1 ? -1 : 1);
    } else {
      // If sorting by a different key, set the new key and default to ascending order
      setSortBy(key);
      setSortOrder(1);
    }
  };

  const handleStatusChange = (orderId, event) => {
    const newStatus = event.target.value;
    setSelectedStatus({ ...selectedStatus, [orderId]: newStatus });
  };

  const updateOrderStatus = async (orderId) => {
    try {
      const newStatus = selectedStatus[orderId];
      await axios.put(`http://localhost:3300/api/orders/${orderId}`, { status: newStatus });
      // Optionally, you can fetch orders again to refresh the data after updating status
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="bg-teal-400 h-screen">
      <div className="p-3 bg-teal-400 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg">
          <h3 className="text-xl">All Orders</h3>
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center">
              <div className="mr-5">
                <span>Items per page:&nbsp;</span>
                <select
                  className="border border-gray-300 text-gray-500 rounded px-3 py-1"
                  value={limit}
                  onChange={handleLimitChange}
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={7}>7</option>
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="text-sm bg-white bg-opacity-0 block ps-10 p-2.5 border-0 border-b-2 border-grey-dark placeholder-gray-400"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Products
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Total Amount
                  </th>
                  <th>Status</th>
                  <th onClick={() => handleSort("orderDate")}>
                    Date{" "}
                    {sortBy === "orderDate" && (sortOrder === 1 ? "▲" : "▼")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="text-gray-900 bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="px-6 py-3">{order.customer.username}</td>
                    <td className="px-6 py-3">
                      {/* Display product details here */}
                      <ul>
                        {order.products.map((product) => (
                          <li key={product._id}>
                            <span>{product.product?.name}</span>{" "}
                            <b>
                              x<span>{product.quantity}</span>
                            </b>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-3">{order.totalAmount}</td>
                    <td className="px-6 py-3 flex items-center justify-center">
                      <select
                        value={selectedStatus[order._id] || order.status}
                        onChange={(e) => handleStatusChange(order._id, e)}
                      >
                        <option value="pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                       
                      <button onClick={() => updateOrderStatus(order._id)}>
                        <img src="save.png" className="h-[20px]" alt="#"/>
                      </button>
                    </td>
                    <td className="px-6 py-3">{formatDate(order.orderDate)}</td>
                    <td className="px-6 py-3 flex h-[100px] items-center justify-around gap-1">
                      <Link to={`/orders/${order._id}`}>
                        <img src="view.png" alt="view" className="h-[20px]" />
                      </Link>
                      <button onClick={() => handleDelete(order._id)}>
                        <img
                          src="delete.png"
                          alt="delete"
                          className="h-[20px]"
                        />
                      </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-teal-400 hover:bg-teal-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
