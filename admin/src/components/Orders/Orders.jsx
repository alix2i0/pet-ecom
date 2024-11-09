import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

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
      // console.log(orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    // console.log(orders);

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
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
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
      await axios.put(`http://localhost:3300/api/orders/${orderId}`, {
        status: newStatus,
      });
      // Optionally, you can fetch orders again to refresh the data after updating status
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  
    // console.log(orders)
    
  

  return (
    <div className="bg-gray-100 h-screen">
      <div className="p-3 bg-gray-100 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg">
          <h3 className="text-xl">All Orders</h3>
          <div className="flex justify-end items-center mb-8">
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
                    className="w-4 h-4 text-secondary dark:text-primary"
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
                  className="text-sm bg-opacity-0 block ps-10 p-2.5 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">Customer</TableHead>
                  <TableHead scope="col">Products</TableHead>
                  <TableHead scope="col">Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead onClick={() => handleSort("orderDate")}>
                    Date{" "}
                    {sortBy === "orderDate" && (sortOrder === 1 ? "▲" : "▼")}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id} >
                    <TableCell>{order.customer?.username}</TableCell>
                    {/* Display product details here */}
                    <TableCell>
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
                    </TableCell>
                    <TableCell className=" text-lg">
                      ${order.totalAmount}
                    </TableCell>
                    <TableCell className="px-6 py-3">
                      <div className="flex">
                        <select
                          value={selectedStatus[order._id] || order.status}
                          onChange={(e) => handleStatusChange(order._id, e)}
                          className={`p-1 rounded-3xl ${
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
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Stock Not Available">
                            Stock Not Available
                          </option>
                        </select>

                        <button onClick={() => updateOrderStatus(order._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#787878"
                              d="M20 7.423v10.962q0 .69-.462 1.153T18.384 20H5.616q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h10.961zm-8.004 9.115q.831 0 1.417-.582T14 14.543t-.582-1.418t-1.413-.586t-1.419.581T10 14.535t.582 1.418t1.414.587M6.769 9.77h7.423v-3H6.77z"
                            ></path>
                          </svg>{" "}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell className="flex h-[100px] items-center justify-center gap-2">
                      <Link
                        to={`/orders/${order._id}`}
                        className=" rounded-s-3xl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5em"
                          height="1.5em"
                          viewBox="0 0 32 32"
                        >
                          <circle cx={16} cy={16} r={4} fill="blue"></circle>
                          <path
                            fill="blue"
                            d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5"
                          ></path>
                        </svg>{" "}
                      </Link>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="rounded-e-3xl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5em"
                          height="1.5em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="red"
                            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                          ></path>
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-primary hover:bg-secondary text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div> */}

          <div className="flex justify-center gap-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                currentPage === 1
                  ? "text-gray-900  pointer-events-none"
                  : "text-gray-600 hover:bg-neutral-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                ></path>
              </svg>
              Previous
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`relative block px-3 py-1.5 text-sm transition-all duration-300 ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                currentPage === totalPages
                  ? "text-gray-900  pointer-events-none"
                  : "text-gray-600 hover:bg-neutral-200"
              }`}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
