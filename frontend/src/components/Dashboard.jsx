import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
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

  const toggleSettingsMenu = () => {
    const settingsMenu = document.getElementById("settings-menu");
    settingsMenu.classList.toggle("hidden"); // Toggle the visibility of the settings menu
  };
  return (
    <div>
      <Sidebar/>
      {/* Header */}
      <div class=" sm:ml-64 pl-1">
        <div className="w-full h-[60px] bg-white flex items-center">
          <div className="w-1/2">
            <form class="flex items-center max-w-sm p-2">
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full ">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="text-sm bg-white bg-opacity-0 block w-full ps-10 p-2.5 border-0 border-b-2 border-grey-dark placeholder-gray-400"
                  placeholder="Search..."
                  required
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ms-2 text-sm font-medium text-white bg-teal-400 rounded-lg border border-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </div>
          <div className="w-1/2 flex justify-end p-2">
            <div className="relative">
              <button
                onClick={toggleSettingsMenu}
                type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>

              {/* Settings Menu */}
              <div
                className="absolute right-0 top-0 mt-12 hidden bg-white shadow-md rounded-lg w-48 p-4"
                id="settings-menu"
              >
                {/* Settings menu content */}
                <ul>
                  <li>
                    <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-teal-400 h-screen p-3 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">All Products</h3>
            <button className="p-1 text-teal-400 rounded-lg bg-white border-solid border border-teal-400 hover:bg-teal-400 hover:text-white">Add product</button>
          </div>
          <div className="overflow-x-auto">
            <table class="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3 truncate">
                    Description
                  </th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} class="text-gray-900">
                    
                    <td class="px-6 py-3">{product.name}</td>
                    <td class="px-6 py-3">${product.price}</td>
                    <td class="px-6 py-3">{product.description}</td>
                    <td class="px-6 py-3">{product.category}</td>
                    <td class="px-6 py-3">{product.quantity}</td>
                    <td class="px-6 py-3 flex h-[100px] items-center justify-center gap-1 ">
                      <button
                        href="#"
                        class="rounded-lg font-medium bg-blue-400 hover:bg-blue-500 text-white p-0.5 w-[70px]"
                      >
                        View
                      </button>
                      <button
                        href="#"
                        class="rounded-lg font-medium bg-yellow-400 hover:bg-yellow-500 text-white p-0.5 w-[70px]"
                      >
                        Edit
                      </button>
                      <button
                        class="rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white p-0.5 w-[70px]"
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
    </div>
  );
};

export default Dashboard;
