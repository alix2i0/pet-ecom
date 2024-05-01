import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../../services/reducer/categorySlice'

const CategoryList = () => {
    const category = useSelector((state) => state.category);
    const dispatch = useDispatch();
    console.log("category", category);
    useEffect(() =>{
        dispatch(fetchCategories());
    },[])

  return (
    <div>
        <table className="w-full border">
            <thead>
                <tr className="border">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Edit</th>
                    <th className="border p-2">Delete</th>
                </tr>
            </thead>
            <tbody>
                {category.categories && category.categories.map((category) => (
                    <tr key={category._id} className="border">
                        <td className="border p-2">
                            <Link to={`/category/${category._id}/edit`}>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Edit
                                </button>
                            </Link>
                        </td>
                        <td className="border p-2">{category.name}</td>
                        <td className="border p-2">
                            <Link to={`/category/${category._id}/delete`}>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default CategoryList