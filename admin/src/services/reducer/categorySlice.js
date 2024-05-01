import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState ={
    isLoading: false,
    isError: null,
    categories: []
}

export const fetchCategories = createAsyncThunk ("category/fetchCategories", async () => {
    const response = await axios.get("http://localhost:3300/api/categories");
    return response.data;
})