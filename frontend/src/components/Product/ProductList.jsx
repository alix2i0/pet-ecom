import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3300/api/products"); // Adjust the endpoint URL as per your backend setup
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-teal-400 h-screen p-3 sm:ml-64 overflow-hidden">
      <div className="bg-white p-3 shadow-md sm:rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl">All Products</h3>
          <button className="p-1 text-teal-400 rounded-lg bg-white border-solid border border-teal-400 hover:bg-teal-400 hover:text-white">
            Add product
          </button>
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
                  <td className="px-6 py-3">{product.category}</td>
                  <td className="px-6 py-3">{product.quantity}</td>
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
      </div>
    </div>
  );
};

export default ProductList;
