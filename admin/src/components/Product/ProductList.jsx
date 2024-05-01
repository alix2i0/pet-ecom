import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import ProductEditForm from "./EditForm";
import Pagination from "./Pagination.jsx";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState({});

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
  if (sortBy) {
    filteredProducts.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
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

  const handleCloseProductForm = () => setIsProductFormOpen(false);

  const handleOpenEditForm = (productId) => {
    console.log("Edit form started");
    setEditProductId(productId);
    setIsEditFormOpen(true);
    console.log("Edit form opened");
  };

  const handleCloseEditForm = () => setIsEditFormOpen(false);

  const handleProductSubmit = async (formData) => {
    try {
      console.log(formData);
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

  return (
    <>
      <div className="bg-teal-400 h-screen">
        <div className="bg-teal-400 p-3 sm:ml-64 overflow-hidden">
          <div className="bg-white p-3 shadow-md sm:rounded-lg">
            <h3 className="text-xl">All Products</h3>
            <div className="flex flex-col gap-8">
            <div className="flex justify-end items-center gap-8">
              <div className="flex justify-center items-center">
                <div className="mr-5">
                  <span>Items per page:&nbsp;</span>
                  <select className="border border-gray-300 text-gray-500 rounded px-3 py-1">
                    <option>3</option>
                    <option>5</option>
                    <option>7</option>
                  </select>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-teal-500 dark:text-teal-400"
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
                    className="text-sm bg-opacity-0 block ps-10 p-2.5 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-teal-400 peer"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <button
                className="p-2 hover:bg-teal-500 rounded-lg bg-teal-400 text-white"
                onClick={handleOpenProductForm}
              >
                Add product
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
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 truncate">
                      Description
                    </th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="text-gray-900 hover:bg-gray-100 bg-gray-50"
                    >
                      <td className="px-6 py-3">{product.name}</td>
                      <td className="px-6 py-3">${product.price}</td>
                      <td className="px-6 py-3">{product.description}</td>
                      <td className="px-6 py-3">{product.category.name}</td>
                      <td className="px-6 py-3">{product.quantity}</td>
                      <td className="px-6 py-3 flex h-[100px] items-center justify-around gap-1 ">
                        <button href="#">
                          <img src="view.png" alt="view" className="h-[20px]" />
                        </button>
                        <button
                          onClick={() => handleOpenEditForm(product._id)}
                        >
                          <img src="edit.png" alt="edit" className="h-[20px]" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
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
            </div></div>
            {/* Pagination component */}
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
      <ProductEditForm
        isOpen={isEditFormOpen}
        // onSubmit={handleEditSubmit}
        onClose={handleCloseEditForm}
        productId={editProductId}
      />
      {/* {isProductFormOpen && (
        <ProductForm
          onSubmit={handleProductSubmit}
          onClose={handleCloseProductForm}
        />
      )} */}
      {/* </div> */}
    </>
  );
};

export default ProductList;
