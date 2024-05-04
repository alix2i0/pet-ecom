import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductView = ({ isOpen, onClose, productId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
    console.log('--------------------------------');
  useEffect(() => {
    if (productId) {
      // Fetch product data based on productId
      axios.get(`http://localhost:3300/api/products/${productId}`, {
        withCredentials: true,
      })
      .then(response => {
        const { name, price, description, category, quantity ,image} = response.data;
        setName(name);
        setPrice(price);
        setDescription(description);
        setCategory(category.name);
        setQuantity(quantity);
        setImage(image);
      })
      .catch(error => console.error('Error fetching product:', error));
    }
  }, [productId]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const userFormElements = document.getElementsByClassName("bg-teal-400 shadow p-3");
      if (userFormElements.length > 0) {
        const userFormElement = userFormElements[0]; // Assuming there's only one element with this class
        if (!userFormElement.contains(e.target)) {
          onClose();
        }
      }
    };
  
    document.addEventListener("mousedown", handleOutsideClick);
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-teal-400 shadow p-3">
          <div className="bg-white p-5 rounded-lg w-[350px] flex flex-col gap-3">
          <h2 className="text-xl text-gray-800 mb-3">Edit product</h2>
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              // src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                src={image}
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
            <p>Price: ${price}</p>
            <p>Category: {category}</p>
            <p>Quantity: {quantity}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
