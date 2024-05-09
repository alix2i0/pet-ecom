import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState ={
    isLoading: false,
    isError: null,
    categories: [],
    productscat:[]
}

export const fetchCategories = createAsyncThunk ("category/fetchCategories", async (params) => {
    const response = await axios.get("http://localhost:3300/api/categories/",{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        },
        params
    });
    return response.data;
})

export const createCategories   = createAsyncThunk ("category/createCategories", async (data) => {
    const response = await axios.post("http://localhost:3300/api/categories/", data,{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    return response.data;
})

export const updateCategories   = createAsyncThunk ("category/updateCategories", async (data) => {
    const response = await axios.put(`http://localhost:3300/api/categories/${data.id}`, data.data,{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    return response.data;
})

export const deleteCategories   = createAsyncThunk ("category/deleteCategories", async (data) => {
    const response = await axios.delete(`http://localhost:3300/api/categories/${data}`,{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    return response.data;
})

// get category Details
export const getCategoryById = createAsyncThunk ("category/getCategoryById", async (id) => {
    const response = await axios.get(`http://localhost:3300/api/categories/${id}`,{
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
                state.categories = action.payload.categories;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;

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
                state.isError = null;
                state.categories.push(action.payload);
            })
            .addCase(createCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            // add case for updating a new Category
            .addCase(updateCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updateCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.categories = state.categories.map((category) => {
                    if (category._id === action.payload._id) {
                        return action.payload;
                    }
                    return category;
                });
            })
            .addCase(updateCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            // add case for deleting a new Category
            .addCase(deleteCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deleteCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.categories = state.categories.filter((category) => category._id !== action.payload.id);
            })
            .addCase(deleteCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })

            // Category details 
            .addCase(getCategoryById.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                console.log(action.payload);
                state.category = action.payload.category;
                state.products = action.payload.products;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })


    }

})

export const selectError = (state) => state.error
export const selectIsLoading = (state) => state.loading
export const selectCategories = (state) => state.category
export const selectProductperCatgory = (state) => state.category.productscat
export const selectCurrentPage = (state) => state.category.currentPage
export const selectTotalPages = (state) => state.category.totalPages


export default categorySlice.reducer