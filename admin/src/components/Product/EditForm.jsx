import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductEditForm = ({ isOpen, onClose, productId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/products/category',{
            withCredentials: true,
          });
        console.log(response);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (productId) {
      // Fetch product data based on productId
      axios.get(`http://localhost:3300/api/products/${productId}`,
      {
        withCredentials: true,
      }
    )
        .then(response => {
          const { name, price, description, category, quantity } = response.data;
          setName(name);
          setPrice(price);
          setDescription(description);
          setCategory(category.name);
          setQuantity(quantity);
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [productId]);
//   const handleEditSubmit = async (formData) => {
//     const { productId, ...restFormData } = formData;
//     try {
//       const response = await axios.put(
//         `http://localhost:3300/api/products/${productId}`,
//         restFormData,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log("Product edited successfully:", response.data);
//     } catch (error) {
//       console.error("Error editing product:", error);
//     }
//   };
useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest('.max-w-sm')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

const handleSubmit = async (event) => {
    event.preventDefault();
    const Data = { name, price, description, category, quantity };
    console.log("this data",Data)
    try {
      const response = await axios.put(
        `http://localhost:3300/api/products/${productId}`,
        Data,
        {
          withCredentials: true,
        }
      );
      console.log("Product edited successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };
  
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="max-w-sm w-full bg-white shadow-md rounded-lg p-6">
            <button
              onClick={handleClose}
              className="absolute top-14 right-14 text-gray-600 hover:text-gray-800 focus:outline-none bg-white rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
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
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price
                </label>
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
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                {/* <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            /> */}
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value=""></option>
                  {/* {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))} */}
                  {categories.map(
                    (cat) =>
                    cat.name != category &&
                      (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      )
                  )}
                </select>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="block w-full p-4 text-white bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductEditForm;
