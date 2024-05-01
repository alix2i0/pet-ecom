import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../services/reducer/categorySlice";

const CategoryList = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  console.log("category", category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="bg-teal-400 h-screen">
      <div className="p-3 bg-teal-400 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg">
          <h3 className="text-xl">All Orders</h3>

          <div className="flex justify-end items-center mb-8">
            <div className="flex items-center">
              <div className="mr-5">
                <span>Items per page:&nbsp;</span>
                <select
                  className="border border-gray-300 text-gray-500 rounded px-3 py-1"
                  value="{limit}"
                  onChange="{handleLimitChange}"
                >
                  <option>3</option>
                  <option>5</option>
                  <option>7</option>
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="text-sm bg-white bg-opacity-0 block ps-10 p-2.5 border-0 border-b-2 border-grey-dark placeholder-gray-400"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.categories &&
                  category.categories.map((category) => (
                    <tr
                      key={category._id}
                      className="text-gray-900 bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="px-6 py-3">{category.name}</td>
                      <td className="px-6 py-3 flex h-[100px] items-center justify-center gap-3">
                        <button>
                          <img src="view.png" alt="view" className="h-[20px]" />
                        </button>
                        <button>
                          <img src="edit.png" alt="edit" className="h-[20px]" />
                        </button>

                        <button>
                          <img
                            src="delete.png"
                            alt="delete"
                            className="h-[20px]"
                          />
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

export default CategoryList;
