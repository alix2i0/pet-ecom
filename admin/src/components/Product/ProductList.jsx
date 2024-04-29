import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3300/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenProductForm = () => {
    console.log("Product form started");
    setIsProductFormOpen(true);
    console.log("Product form opened");
  };
  
  const handleCloseProductForm = () => setIsProductFormOpen(false);

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
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
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
          <div className="flex justify-end items-center gap-8 mb-4">
            <div className="flex justify-center items-center">
              <div className="mr-5">
                <span>Items per page:&nbsp;</span>
                <select
                  className="border border-gray-300 text-gray-500 rounded px-3 py-1"
                  
                >
                  <option>3</option>
                  <option>5</option>
                  <option>7</option>
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
                />
              </div>
            </div>
            
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
                  <tr key={product._id} className="text-gray-900 hover:bg-gray-100 bg-gray-50">
                    <td className="px-6 py-3">{product.name}</td>
                    <td className="px-6 py-3">${product.price}</td>
                    <td className="px-6 py-3">{product.description}</td>
                    <td className="px-6 py-3">{product.category}</td>
                    <td className="px-6 py-3">{product.quantity}</td>
                    <td className="px-6 py-3 flex h-[100px] items-center justify-around gap-1 ">
                      <button
                        href="#"
                      >
                        <img src="view.png" alt="view" className="h-[20px]"/>
                      </button>
                      <button
                        href="#"
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
        </div>
      </div>
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
