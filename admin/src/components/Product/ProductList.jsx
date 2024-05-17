import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import ProductEditForm from "./EditForm";
import Pagination from "./Pagination.jsx";
import ProductView from "./ProductView.jsx";
import PetCategory from "./PetCategory.jsx";

import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, createProduct, deleteProductById} from "../../services/reducer/productSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
// import { set } from "mongoose";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [filters, setFilters] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isViewFormOpen, setIsViewFormOpen] = useState(false);
  const [viewProductId, setViewProductId] = useState(null);

  //trying redux ###########################################################
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchProduct());
  // }, [dispatch]);

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  
  //########################################################################

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3300/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination to first page
  };
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  // Function to handle pagination change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtered and sorted products based on current state
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply filters
  Object.keys(filters).forEach((key) => {
    filteredProducts = filteredProducts.filter(
      (product) => product[key] === filters[key]
    );
  });

  // Apply sorting
  // if (sortBy) {
  //   filteredProducts.sort((a, b) => {
  //     if (a[sortBy] < b[sortBy]) return -1;
  //     if (a[sortBy] > b[sortBy]) return 1;
  //     return 0;
  //   });
  // }
  // Inside the sorting logic
  if (sortBy === "category") {
    filteredProducts.sort((a, b) => {
      const categoryNameA = a.category.name.toLowerCase();
      const categoryNameB = b.category.name.toLowerCase();
      if (categoryNameA < categoryNameB) return sortOrder === "asc" ? -1 : 1;
      if (categoryNameA > categoryNameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  } else {
    filteredProducts.sort((a, b) => {
      const aValue =
        typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
      const bValue =
        typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Get current products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleOpenProductForm = () => {
    console.log("Product form started");
    setIsProductFormOpen(true);
    console.log("Product form opened");
  };
  const handleOpenViewForm = (productId) => {
    console.log("View form started");
    setViewProductId(productId);
    setIsViewFormOpen(true);
    console.log("View form opened");
  };

  const handleOpenEditForm = (productId) => {
    console.log("Edit form started");
    setEditProductId(productId);
    setIsEditFormOpen(true);
    console.log("Edit form opened");
  };

  const handleCloseProductForm = () => setIsProductFormOpen(false);
  const handleCloseViewForm = () => setIsViewFormOpen(false);
  const handleCloseEditForm = () => setIsEditFormOpen(false);
  const handleProductSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/products",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Product created successfully:", response.data);
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // const handleEditSubmit = (data, id) => {
  //   setProducts(prevProducts =>
  //     prevProducts.map(product =>
  //       product.id === id ? { ...product, ...data } : product
  //     )
  //   );
  // };
  const handleDeleteClick = (id) => {
    setDeleteUserId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3300/api/products/${productId}`, {
        withCredentials: true,
      });
      // Filter out the deleted product from the products state
      setProducts(products.filter((product) => product._id !== productId));
      console.log("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

    const closeModal = () => {
      setDeleteUserId(null);
      setDeleteModalOpen(false);
    };
    const confirmDelete = () => {
      if (deleteUserId) {
        // dispatch(deleteUser(deleteUserId));
        handleDeleteProduct(deleteUserId);
        setDeleteUserId(null);
        setDeleteModalOpen(false);
      }
    };

  return (
    <>
      <div className="bg-primary h-screen">
        <div className="bg-primary p-3 sm:ml-64 overflow-hidden">
          <div className="bg-white p-3 shadow-md rounded-lg">
            <h3 className="text-xl">All Products</h3>
            <div className="flex flex-col gap-8">
              <div className="flex justify-end items-center gap-8">
                <div className="flex justify-center items-center">
                  {/* <div className="mr-5">
                    <span>Items per page:&nbsp;</span>
                    <select className="border border-gray-300 text-gray-500 rounded px-3 py-1">
                      <option>3</option>
                      <option>5</option>
                      <option>7</option>
                    </select>
                  </div> */}
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-primary dark:text-primary"
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
                      value={searchQuery}
                      onChange={handleSearch}
                      type="text"
                      className="text-sm bg-opacity-0 block ps-10 p-2.5 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder="Search..."
                    />
                  </div>
                </div>
                <PetCategory/>
                <button
                  className="p-2 hover:bg-secondary rounded-lg bg-primary text-white"
                  onClick={handleOpenProductForm}
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Product
                </button>
              </div>
              <ProductForm
                isOpen={isProductFormOpen}
                onClose={handleCloseProductForm}
                onSubmit={handleProductSubmit}
              />
              <div className="overflow-x-auto mb-5">
                <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3"
                        onClick={() => handleSort("name")}
                      >
                        Name
                        {sortBy === "name" && (
                          <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                        )}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3"
                        onClick={() => handleSort("price")}
                      >
                        Price
                        {sortBy === "price" && (
                          <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                        )}
                      </th>
                      <th scope="col" className="px-6 py-3 truncate">
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3"
                        onClick={() => handleSort("category")}
                      >
                        Category
                        {sortBy === "category" && (
                          <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                        )}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3"
                        onClick={() => handleSort("quantity")}
                      >
                        Stock
                        {sortBy === "quantity" && (
                          <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                        )}
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product) => (
                      <tr
                        key={product._id}
                        className="text-gray-900 hover:bg-gray-100 bg-gray-50 text-sm font-medium "
                      >
                        <td className="px-6 py-3">{product.name}</td>
                        <td className="px-6 py-3 text-center text-emerald-500">
                          ${product.price}
                        </td>
                        <td className="px-6 py-3">{product.description}</td>
                        <td className="px-6 py-3">{product.category.name}</td>
                        <td className="px-6 py-3 text-red-500">
                          {product.quantity}
                        </td>
                        {/* i changed the color to read maybe black instead just remove the color */}
                        <td className="px-6 py-3 flex h-[100px] w-[200px] items-center justify-around gap-1 ">
                          <button
                            onClick={() => handleOpenViewForm(product._id)}
                          >
                            <img
                              src="view.png"
                              alt="view"
                              className="h-[20px]"
                            />
                          </button>
                          <button
                            onClick={() => handleOpenEditForm(product._id)}
                          >
                            <img
                              src="edit.png"
                              alt="edit"
                              className="h-[20px]"
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product._id)}
                          >
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
            </div>
            {/* Pagination component */}
            {/* <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length}
              currentPage={currentPage}
              paginate={paginate}
            /> */}
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length} // Update totalProducts with the length of filteredProducts
              currentPage={currentPage}
              paginate={paginate}
            />

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
      </div>
      <ProductEditForm
        isOpen={isEditFormOpen}
        onClose={handleCloseEditForm}
        productId={editProductId}
        // onSubmit={(data, productId) => handleEditSubmit(data, productId)}
      />
      <ProductView
        isOpen={isViewFormOpen}
        onClose={handleCloseViewForm}
        productId={viewProductId}
      />
      {/* {isProductFormOpen && (
        <ProductForm
          onSubmit={handleProductSubmit}
          onClose={handleCloseProductForm}
        />
      )} */}
    </>
  );
};

export default ProductList;
