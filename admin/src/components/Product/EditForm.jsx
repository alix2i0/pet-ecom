import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductEditForm = ({ onSubmit, onClose, productId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (productId) {
      // Fetch product data based on productId
      axios.get(`http://localhost:3300/api/products/${productId}`)
        .then(response => {
          const { name, price, description, category, quantity } = response.data;
          setName(name);
          setPrice(price);
          setDescription(description);
          setCategory(category);
          setQuantity(quantity);
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [productId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, price, description, category, quantity });
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <span className="text-gray-700 text-2xl cursor-pointer absolute top-0 right-0" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button type="submit" className="block w-full p-4 text-white bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditForm;
