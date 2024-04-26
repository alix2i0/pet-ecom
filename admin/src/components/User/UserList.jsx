import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5); // Default limit
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/users?page=${currentPage}&limit=${limit}&search=${searchTerm}`,
          {
            withCredentials: true,
          }
        );
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage, limit, searchTerm]); // Include searchTerm in the dependency array

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-teal-400 h-screen">
      <div className="bg-teal-400 p-3 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">All Users</h3>
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
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  class="text-sm bg-white bg-opacity-0 block ps-10 p-2.5 border-0 border-b-2 border-grey-dark placeholder-gray-400"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Firstname
                  </th>
                  <th scope="col" className="px-6 py-3">
                    LastName
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Email
                  </th>
                  <th>Username</th>
                  <th>Is Admin</th>
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
                      <button className="rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white p-0.5 w-[70px]">
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
                  currentPage === index + 1
                    ? "bg-gray-600 text-white"
                    : "bg-white text-gray-600"
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

export default UserList;
