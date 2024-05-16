import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCategories} from '../../services/reducer/petCategorySlice'
export default function PetCategory() {
  return (
    <>
      <div>PetCategory</div>
    </>
  );
}

    //   <div className="mb-5">
    //     <label htmlFor="category" className="block mb-2 text-sm text-gray-900">
    //       Category
    //     </label>
    //     {/* <input
    //           type="text"
    //           id="category"
    //           value={category}
    //           onChange={(e) => setCategory(e.target.value)}
    //           className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
    //         /> */}
    //     <select
    //       id="category"
    //       value={category}
    //       onChange={(e) => setCategory(e.target.value)}
    //       className="block w-full p-1 text-gray-900 border-none border-gray-300 rounded-lg bg-gray-50  "
    //     >
    //       <option value=""></option>
    //       {/* {categories.map((cat) => (
    //         <option key={cat._id} value={cat._id}>{cat.name}</option>
    //         ))} */}
    //       {categories.map(
    //         (cat) =>
    //           cat.name != category && (
    //             <option key={cat._id} value={cat._id}>
    //               {cat.name}
    //             </option>
    //           )
    //       )}
    //     </select>
    //   </div>