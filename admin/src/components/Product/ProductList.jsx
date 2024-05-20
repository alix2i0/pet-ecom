import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  selectIsLoading,
  selectTotalPages,
  setSearch,
  selectError,
  selectProduct,
} from "../../services/reducer/productSlice";
import ProductForm from "./ProductForm";
import ProductEditForm from "./EditForm";
import Pagination from "./Pagination";
import ProductView from "./ProductView";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import PetCategory from "./PetCategory";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProduct);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  const totalPages = useSelector(selectTotalPages);

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Fixed products per page
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isViewFormOpen, setIsViewFormOpen] = useState(false);
  const [viewProductId, setViewProductId] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProduct({
        page: currentPage,
        limit: productsPerPage,
        search: searchQuery,
      })
    );
  }, [dispatch, currentPage, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination to first page
    dispatch(setSearch(e.target.value));
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let filteredProducts = Array.isArray(products.product)
    ? products.product.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  // console.log(filteredProducts);

  Object.keys(filters).forEach((key) => {
    filteredProducts = filteredProducts.filter(
      (product) => product[key] === filters[key]
    );
  });
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );


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

  const handleOpenProductForm = () => {
    setIsProductFormOpen(true);
  };

  const handleOpenViewForm = (productId) => {
    setViewProductId(productId);
    setIsViewFormOpen(true);
  };

  const handleOpenEditForm = (productId) => {
    setEditProductId(productId);
    setIsEditFormOpen(true);
  };

  const handleCloseProductForm = () => setIsProductFormOpen(false);
  const handleCloseViewForm = () => setIsViewFormOpen(false);
  const handleCloseEditForm = () => setIsEditFormOpen(false);

  const handleDeleteClick = (id) => {
    setDeleteUserId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3300/api/products/${productId}`, {
        withCredentials: true,
      });
      dispatch(
        fetchProduct({
          page: currentPage,
          limit: productsPerPage,
          search: searchQuery,
        })
      );
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
      handleDeleteProduct(deleteUserId);
      setDeleteUserId(null);
      setDeleteModalOpen(false);
    }
  };

  const handleProductSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:3300/api/products", formData, {
        withCredentials: true,
      });
      console.log("Product created successfully.");
      dispatch(
        fetchProduct({
          page: currentPage,
          limit: productsPerPage,
          search: searchQuery,
        })
      );
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;

  return (
    <>
      <div className="bg-gray-100 h-screen">
        <div className="bg-gray-100 p-3 sm:ml-64 overflow-hidden">
          <div className="bg-white p-3 shadow-md sm:rounded-lg">
            <h3 className="text-xl">All Products</h3>
            <div className="flex flex-col gap-8">
              <div className="flex justify-end items-center gap-8">
                <div className="flex justify-center items-center">
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
                        {/* <td className="px-6 py-3">{product.category.name}</td> */}
                        <td className="px-6 py-3 text-red-500">
                          {product.quantity}
                        </td>
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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            </div>
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
      />
      <ProductView
        isOpen={isViewFormOpen}
        onClose={handleCloseViewForm}
        productId={viewProductId}
      />
    </>
  );
};

export default ProductList;
