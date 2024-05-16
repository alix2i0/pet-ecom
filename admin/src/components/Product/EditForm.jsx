import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../services/reducer/categorySlice";
const ProductEditForm = ({ isOpen, onClose, productId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  // const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);

  const categories = useSelector((state) => state.category.categories);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3300/api/products/category',{
  //           withCredentials: true,
  //         });
  //       console.log(response);
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchCategories({})
    );
  }, [dispatch]);

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
    const userFormElements = document.getElementsByClassName("bg-primary shadow p-3");
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
      // onSubmit(Data,productId);
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
          <div className="bg-primary shadow p-3">
            <div className="bg-white p-5 rounded-lg w-[350px] flex flex-col gap-3">
            <h2 className="text-xl text-gray-800 mb-3">Edit product</h2>

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
                  className="block mb-2 text-sm text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block px-0 w-full text-sm  bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm text-gray-900"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="block px-0 w-full text-sm  bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm text-gray-900"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block px-0 w-full text-sm  bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm text-gray-900"
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
                  className="block w-full p-1 text-gray-900 border-none border-gray-300 rounded-lg bg-gray-50  "
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
                  className="block mb-2 text-sm  text-gray-900"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="block px-0 w-full text-sm  bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                />
              </div>
              <button
                type="submit"
                className="block w-full p-1 text-white bg-primary hover:bg-secondary border border-transparent rounded-lg shadow-sm"
                >
                Save Product
              </button>
            </form>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductEditForm;
