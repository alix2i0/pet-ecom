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
      await axios.delete(`http://localhost:3300/api/products/${productId}`,
      {
        withCredentials: true,
      });
      // Filter out the deleted product from the products state
      setProducts(products.filter(product => product._id !== productId));
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="bg-teal-400 h-screen">
      <div className="bg-teal-400 p-3 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg ">
            <h3 className="text-xl">All Products</h3>
            <button
              className="p-2 hover:bg-teal-500 rounded-lg  bg-teal-400 text-white"
              onClick={handleOpenProductForm}
            >
              Add product
            </button>
            <ProductForm
              isOpen={isProductFormOpen}
              onClose={handleCloseProductForm}
              onSubmit={handleProductSubmit}
            />
          </div>
          <div className="overflow-x-auto">
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
                {products.map((product) => (
                  <tr key={product._id} className="text-gray-900">
                    <td className="px-6 py-3">{product.name}</td>
                    <td className="px-6 py-3">${product.price}</td>
                    <td className="px-6 py-3">{product.description}</td>
                    <td className="px-6 py-3">{product.category.name}</td>
                    <td className="px-6 py-3">{product.quantity}</td>
                    <td className="px-6 py-3 flex h-[100px] items-center justify-center gap-1 ">
                      <button
                        href="#"
                      >
                        View
                      </button>
                      <button
                        href="#"
                        className="rounded-lg font-medium bg-yellow-400 hover:bg-yellow-500 text-white p-0.5 w-[70px]"
                      >
                        <img src="edit.png" alt="edit" className="h-[20px]"/>
                      </button>
                      <button
                      onClick={() => handleDeleteProduct(product._id)}
                      >
                        <img src="delete.png" alt="delete" className="h-[20px]"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination component */}
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
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
    </div>
  );
};

export default ProductList;
