import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCategories } from '../../services/reducer/categorySlice'


const CategoryForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const[name,setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategories({name}))
        navigate('/categories')
    }
    

  return (
    <div>
        <h1>Category Form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" />

            <button type="submit">Submit</button>
            <input  type="button" value="Cancel" onClick={() => navigate('/categories')} />   
            </form>
    </div>
  )
}

export default CategoryForm