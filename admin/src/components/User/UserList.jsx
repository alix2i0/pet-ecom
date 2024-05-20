import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../services/reducer/userSlice";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserList = () => {
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false); // Add state for showing add user form
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);
  const totalPages = useSelector((state) => state.user.totalPages);
  const currentPage = useSelector((state) => state.user.currentPage);
  
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers({ limit, searchTerm, sortBy, sortOrder }));
  }, [dispatch, limit, searchTerm, sortBy, sortOrder]);

  const handlePageChange = (newPage) => {
    dispatch(
      getAllUsers({
        currentPage: newPage,
        limit,
        searchTerm,
        sortBy,
        sortOrder,
      })
    );
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 1 ? -1 : 1);
    } else {
      setSortBy(key);
      setSortOrder(1);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteUserId(id);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (id) => {
    navigate(`/users/${id}/edit`);
  };

  const confirmDelete = () => {
    if (deleteUserId) {
      dispatch(deleteUser(deleteUserId));
      setDeleteUserId(null);
      setDeleteModalOpen(false);
    }
  };

  const closeModal = () => {
    setDeleteUserId(null);
    setDeleteModalOpen(false);
  };

  const handleAddUserClick = () => {
    setShowAddUserForm(true);
  };

  const handleCloseForm = () => {
    setShowAddUserForm(false);
  };
  const handleOpenForm = () => {
    setShowAddUserForm(true);
  };

  return (
 
    <div className="bg-gray-100 h-screen">
      <div className="bg-gray-100 p-3 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg ">
          <h3 className="text-xl">All Users</h3>
          <div className="flex flex-col gap-8 mb-4">
            <div className="flex justify-end items-center">
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
              <div className="relative mr-5">
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

              <button
                onClick={handleAddUserClick} // Call handleAddUserClick on button click
                className="p-2 hover:bg-secondary rounded-lg bg-primary text-white"
              >
                <FontAwesomeIcon icon={faPlusSquare} /> Add User
              </button>
            </div>
            {showAddUserForm && ( // Conditionally render the form
              <div className="p-3 bg-gray-200 rounded-lg">
                {/* Your form JSX goes here */}
                <UserForm isOpen={handleOpenForm} onClose={handleCloseForm} />
                <button onClick={handleCloseForm}>Close Form</button>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={() => handleSort("firstName")}
                    >
                      Firstname{" "}
                      {sortBy === "firstName" && (sortOrder === 1 ? "▲" : "▼")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={() => handleSort("lastName")}
                    >
                      LastName{" "}
                      {sortBy === "lastName" && (sortOrder === 1 ? "▲" : "▼")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 truncate"
                      onClick={() => handleSort("email")}
                    >
                      Email{" "}
                      {sortBy === "email" && (sortOrder === 1 ? "▲" : "▼")}
                    </th>
                    <th onClick={() => handleSort("username")}>
                      Username{" "}
                      {sortBy === "username" && (sortOrder === 1 ? "▲" : "▼")}
                    </th>
                    <th onClick={() => handleSort("isAdmin")}>
                      Is Admin{" "}
                      {sortBy === "isAdmin" && (sortOrder === 1 ? "▲" : "▼")}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="text-gray-900 hover:bg-gray-100 bg-gray-50"
                    >
                      <td className="px-6 py-3">{user.firstName}</td>
                      <td className="px-6 py-3">{user.lastName}</td>
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3">{user.username}</td>
                      <td className="px-6 py-3">
                        {user.isAdmin ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-3 flex h-[100px] items-center justify-around ">
                        <Link to={`/users/${user._id}`}>
                          <img src="view.png" alt="view" className="h-[20px]" />{" "}
                        </Link>
                        <button onClick={() => handleEditClick(user._id)}>
                          <img src="edit.png" alt="edit" className="h-[20px]" />
                        </button>
                        <button onClick={() => handleDeleteClick(user._id)}>
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
                      ? "bg-primary hover:bg-secondary text-white"
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
        {/* Delete confirmation modal */}
        {deleteModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg">
              <p>Are you sure you want to delete this user?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
};


export default UserList;
