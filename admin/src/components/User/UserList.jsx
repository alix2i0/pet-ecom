import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5); // Default limit
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term
  const [sortBy, setSortBy] = useState(""); // State to hold current sorting option
  const [sortOrder, setSortOrder] = useState(1); // State to hold sorting order (1 for ascending, -1 for descending)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/users?page=${currentPage}&limit=${limit}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
          {
            withCredentials: true,
          }
        );
        console.log(sortBy, sortOrder);
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage, limit, searchTerm, sortBy, sortOrder]); // Include sortBy and sortOrder in the dependency array

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

  return (
    <>
      <div className="bg-teal-400 h-screen p-3 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">All Users</h3>
            <div className="flex items-center">
              <span>Items per page: </span>
              <select
                className="border border-gray-300 rounded px-3 py-1"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded ml-3 px-3 py-1"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  <th scope="col" className="px-6 py-3" onClick={() => handleSort("firstName")}>
                    Firstname {sortBy === "firstName" && (sortOrder === 1 ? "▲" : "▼")}
                  </th>
                  <th scope="col" className="px-6 py-3" onClick={() => handleSort("lastName")}>
                    LastName {sortBy === "lastName" && (sortOrder === 1 ? "▲" : "▼")}
                  </th>
                  <th scope="col" className="px-6 py-3 truncate" onClick={() => handleSort("email")}>
                    Email {sortBy === "email" && (sortOrder === 1 ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("username")}>
                    Username {sortBy === "username" && (sortOrder === 1 ? "▲" : "▼")}
                  </th>
                  <th onClick={() => handleSort("isAdmin")}>
                    Is Admin {sortBy === "isAdmin" && (sortOrder === 1 ? "▲" : "▼")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="text-gray-900">
                    <td className="px-6 py-3">{user.firstName}</td>
                    <td className="px-6 py-3">{user.lastName}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">{user.username}</td>
                    <td className="px-6 py-3">{user.isAdmin ? "Yes" : "No"}</td>
                    <td className="px-6 py-3 flex h-[100px] items-center justify-center gap-1 ">
                      <button
                        href="#"
                        className="rounded-lg font-medium bg-blue-400 hover:bg-blue-500 text-white p-0.5 w-[70px]"
                      >
                        View
                      </button>
                      <button
                        href="#"
                        className="rounded-lg font-medium bg-yellow-400 hover:bg-yellow-500 text-white p-0.5 w-[70px]"
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white p-0.5 w-[70px]"
                      >
                        Delete
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
                  currentPage === index + 1 ? "bg-gray-600 text-white" : "bg-white text-gray-600"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
