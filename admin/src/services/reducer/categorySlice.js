import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState ={
    isLoading: false,
    isError: null,
    categories: []
}

export const fetchCategories = createAsyncThunk ("category/fetchCategories", async () => {
    const response = await axios.get("http://localhost:3300/api/categories/",{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    return response.data;
})

export const createCategories   = createAsyncThunk ("category/createCategories", async () => {
    const response = await axios.post("http://localhost:3300/api/categories/",{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    return response.data;
})


export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            // add case for creating a new Category
            .addCase(createCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(createCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(createCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })

    }

})

export const selectError = (state) => state.error
export const selectIsLoading = (state) => state.loading
export const selectCategories = (state) => state.category

export default categorySlice.reducer