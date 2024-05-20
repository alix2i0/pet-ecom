// CategoryList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategories,
} from "../../services/reducer/categorySlice";
import CategoryForm from "./CategoryForm";

const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);
  const currentPage = useSelector((state) => state.category.currentPage);
  const totalPages = useSelector((state) => state.category.totalPages);

  const dispatch = useDispatch();

  // State variables for search, pagination, sorting, and limit
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // State variable to control form visibility and mode (add/edit)
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editCategoryData, setEditCategoryData] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  useEffect(() => {
    dispatch(
      fetchCategories({ search: searchQuery, limit, sortBy, sortOrder })
    );
  }, [dispatch, searchQuery, limit, sortBy, sortOrder]);

  const handlePageChange = (newPage) => {
    dispatch(
      fetchCategories({
        search: searchQuery,
        limit,
        sortBy,
        sortOrder,
        page: newPage,
      })
    );
  };

  // Function to handle limit change
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  // Function to handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddCategory = () => {
    setFormMode("add");
    setIsFormVisible(true);
  };

  const handleEditCategory = (category) => {
    setFormMode("edit");
    setIsFormVisible(true);
    setEditCategoryData(category);
  };

  const handleDeleteClick = (id) => {
    setDeleteCategoryId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteCategoryId) {
      dispatch(deleteCategories(deleteCategoryId));
      setDeleteCategoryId(null);
      setDeleteModalOpen(false);
    }
  };

  const closeModal = () => {
    setDeleteCategoryId(null);
    setDeleteModalOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditCategoryData(null);
  };

  const handleSubmitForm = (formData) => {
    if (formMode === "add") {
      // Logic to add category using API call
    } else if (formMode === "edit") {
      // Logic to edit category using API call
    }
    handleCloseForm();
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="p-3 bg-gray-100 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg">
          <h3 className="text-xl">All Categories</h3>

          <div className="flex justify-end items-center mb-8">
            <div className="flex items-center">
              <div className="mr-5">
                <span>Items per page:&nbsp;</span>
                <select
                  className="border border-gray-300 text-gray-500 rounded px-3 py-1"
                  value={limit}
                  onChange={handleLimitChange}
                >
                  <option>3</option>
                  <option>5</option>
                  <option>7</option>
                </select>
              </div>
              <input
                type="text"
                className="text-sm bg-white bg-opacity-0 block ps-10 p-2.5 border-0 border-b-2 border-grey-dark placeholder-gray-400"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <button
              onClick={handleAddCategory}
              className="p-2 hover:bg-secondary rounded-lg bg-primary text-white"
            >
              Add Category
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="text-gray-900 bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="px-6 py-3">{category.name}</td>
                    <td className="px-6 py-3 flex h-[100px] items-center justify-center gap-3">
                      <button onClick={() => handleEditCategory(category)}>
                        <img src="edit.png" alt="edit" className="h-[20px]" />
                      </button>
                      <button onClick={() => handleDeleteClick(category._id)}>
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

        {deleteModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg">
              <p>Are you sure you want to delete this category?</p>
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
      {isFormVisible && (
        <CategoryForm
          isOpen={isFormVisible}
          onClose={handleCloseForm}
          mode={formMode}
          categoryData={editCategoryData}
          onSubmit={handleSubmitForm}
        />
      )}
    </div>
  );
};

export default CategoryList;
