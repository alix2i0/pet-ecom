import axios from "axios";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const addProducts = async () => {
      try {
        const response = await axios.post("http://localhost:3300/api/products"); // Adjust the endpoint URL as per your backend setup
        setProducts(response.data);
      } catch (error) {
        console.error("Error adding products:", error);
      }
    };
    addProducts();
  }, []);
  return (
    <div className="h-screen flex justify-center bg-teal-300 bg-opacity-50">
      <div className="m-5 p-5 w-[75%] text-center bg-white">
        <h1 className="text-xl">Add Product</h1>
      </div>
    </div>
  );
};

export default AddProduct;
