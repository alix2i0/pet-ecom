import React, { useState } from 'react';

// const ProductForm = ({ onSubmit }) => {
const ProductForm = ({ isOpen, onClose, onSubmit }) => {

//   const [isOpen, setIsOpen] = useState(open);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); 
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null); // Store image data (e.g., URL or file object)

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, price, description, category, quantity, image });
    handleClose(); // Close modal after submit
  };
  const handleClose = () => {
    onClose();
    setName('');
    setPrice(0);
    setDescription('');
    setCategory(null);
    setQuantity(0);
    setImage(null);
  };

  return (
    <>
      {/* <button onClick={handleOpen}>Add Product</button> */}
      {isOpen && (
        // <div className="max-w-sm mx-auto">
        //   <div className="bg-white p-6 rounded-lg shadow-md">
        //     <span className="text-gray-700 text-2xl cursor-pointer absolute top-0 right-0" onClick={handleClose}>&times;</span>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="max-w-sm w-full bg-white shadow-md rounded-lg p-6">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
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
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                //   required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category</label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  
                />
              </div>
              <div className="mb-5">
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="productImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Product Image (optional)</label>
                <input
                  type="file"
                  id="productImage"
                  onChange={(event) => setImage(event.target.files[0])}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button type="submit" className="block w-full p-4 text-black bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-900">Save Product</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
