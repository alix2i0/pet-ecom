import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductView = ({ isOpen, onClose, productId }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (productId) {
      // Fetch product data based on productId
      axios
        .get(`http://localhost:3300/api/products/${productId}`, {
          withCredentials: true,
        })
        .then((response) => {
          const { name, price, description, category, quantity, image } =
            response.data;
          setName(name);
          setPrice(price);
          setDescription(description);
          setCategory(category.name);
          setQuantity(quantity);
          setImages(image.split(",")); // Split images by comma
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const userFormElements = document.getElementsByClassName(
        "bg-primary shadow p-3"
      );
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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-primary shadow p-3">
            <div className="bg-white p-5 rounded w-[700px] flex flex-col">
              <h2 className="text-xl text-gray-800 mb-3">Product Details</h2>
              <button
              onClick={onClose}
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

              <div className="card flex lg:card-side bg-base-100 shadow-xl p-2">
                <div className="flex flex-col gap-5 my-2">
                  <div className="flex">
                    <figure>
                      <img
                        src={
                          images[currentImageIndex] ||
                          "https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                        }
                        alt="Album"
                        // className="h-48 w-64"
                        // height={"200px"}
                        // width={"200px"}
                      />
                      <div className="card-actions justify-between">
                        {images.length > 1 && (
                          <>
                            <div className="flex items-center justify-center">
                              <button
                                className="btn btn-primary flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                onClick={handlePrevImage}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                  className="w-4 h-4 "
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                  ></path>
                                </svg>
                              </button>
                              <button
                                className="btn btn-primary flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                onClick={handleNextImage}
                              >
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </figure>

                    <div className="card-body">
                      <div className="grid gap-4 px-4 py-4 mb-4">
                        <div className="col-span-1 flex flex-col justify-between">
                            <h2 className="text-2xl font-bold text-center">{name}</h2>
                          <div className="flex justify-between mb-2">
                            {/* <h2 className="text-xl text-gray-900">Name:</h2> */}
                          </div>
                          <div className="flex justify-between mb-2">
                            {/* <p className="text-gray-900 mr-5">Description:</p> */}
                            <p className="text-gray-700 text-justify p-2 my-3 border-y-2 ">{description}</p>
                          </div>
                          <div className="flex justify-between mb-2">
                            <p className="text-gray-900">Price :</p>
                            <p className="text-xl text-gray-800">${price}</p>
                          </div>
                          <div className="flex justify-between mb-2">
                            <p className="text-gray-900">Category :</p>
                            <p className="text-gray-600">{category}</p>
                          </div>
                          <div className="flex justify-between mb-2">
                            <p className="text-gray-900">Stock :</p>
                            <p className="font-bold">{quantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <button
                    className="btn btn-primary block w-full p-1 text-white bg-primary hover:bg-secondary border border-transparent rounded-lg shadow-sm "
                    onClick={onClose}
                  >
                    Close
                  </button> */}
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
