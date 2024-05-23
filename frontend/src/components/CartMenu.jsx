// import React from 'react';
// import { useSelector } from 'react-redux';

// const CartMenu = () => {
//     const cartItems = useSelector((state) => state.cart.items);

//     return (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
//             <h2 className="px-4 py-2 text-sm font-semibold text-gray-700">Cart</h2>
//             <div className="px-4 py-2">
//                 {cartItems.map((item) => (
//                     <div key={item.product}>
//                         <p>{item.product.name} - Quantity: {item.quantity}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CartMenu;

// // import React, { useEffect, useRef } from "react";
// // import { useDispatch, useSelector } from "react-redux";

// // const CartMenu = ({ cartItems, onClose }) => {
// //     const cartMenuRef = useRef(null);

// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
// //                 onClose();
// //             }
// //         };

// //         document.addEventListener("mousedown", handleClickOutside);

// //         return () => {
// //             document.removeEventListener("mousedown", handleClickOutside);
// //         };
// //     }, [onClose]);

// //     return (
// //         <div
// //       ref={cartMenuRef}
// //       className={`fixed top-0 right-0 z-50 bg-gray-300 bg-opacity-50 transition-opacity duration-300 ease-in-out transform translate-x-full pointer-events-none ${
// //         onClose ? "opacity-100 translate-x-0 pointer-events-auto" : ""
// //       }`}
// //     >
// //       <div className="absolute right-4 mt-12 w-70 bg-white rounded-md shadow-lg">
// //         <h2 className="px-4 py-2 text-sm font-semibold text-gray-700">Cart</h2>
// //         <div className="px-4 py-2">
// //           {cartItems.map((item) => (
// //             <div key={item.product}>
// //               <p className="text-gray-600">{item.product.name} - Quantity: {item.quantity}</p>
// //             </div>
// //           ))}
// //             <div className="p-4">
// //                 <div className="flex items-center justify-between">
// //                 <p className="font-medium">Total</p>
// //                 <p className="text-2xl font-bold">$170.00</p>
// //                 </div>
// //                 <div className="mt-4 flex ">
               
// //                 <a className="flex-1 text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-amber-600 dark:hover:bg-amber-700 focus:outline-none dark:focus:ring-amber-800">Checkout</a>
                
// //                 </div>
// //             </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CartMenu;


import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "../../../admin/src/services/reducer/cartSlice";

const CartMenu = ({ onClose }) => {
  const cartMenuRef = useRef(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  return (
    <div
      ref={cartMenuRef}
      className={`fixed top-0 right-0 z-50 bg-gray-300 bg-opacity-50 transition-opacity duration-300 ease-in-out transform translate-x-full pointer-events-none ${
        onClose ? "opacity-100 translate-x-0 pointer-events-auto" : ""
      }`}
    >
      <div className="absolute right-4 mt-12 w-70 bg-white rounded-md shadow-lg">
        <h2 className="px-4 py-2 text-sm font-semibold text-gray-700">Cart</h2>
        <div className="px-4 py-2">
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src={item.product.image} alt={item.product.name} className="w-8 h-8 mr-2" />
                <p className="text-gray-600">{item.product.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecreaseQuantity(item.product._id)}
                  className="text-gray-400"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item.product._id)}
                  className="text-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item.product._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">Total</p>
              <p className="text-2xl font-bold">$170.00</p>
            </div>
            <div className="mt-4 flex">
              <button
                onClick={handleClearCart}
                className="flex-1 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              >
                Clear Cart
              </button>
              <a
                href="#"
                className="flex-1 text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-amber-600 dark:hover:bg-amber-700 focus:outline-none dark:focus:ring-amber-800"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
