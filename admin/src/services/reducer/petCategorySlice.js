import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    isError: null,
    petCategories: [],
    petCategory: null,
    products: [],
    currentPage: 0,
    totalPages: 0,
};

export const fetchCategories = createAsyncThunk("petCategory/fetchCategories", async (params) => {
    const response = await axios.get("http://localhost:3300/api/petCategories/", {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
        params
    });
    return response.data;
});

export const createCategories = createAsyncThunk("petCategory/createCategories", async (data) => {
    const response = await axios.post("http://localhost:3300/api/petCategories/", data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
});

export const updateCategories = createAsyncThunk("petCategory/updateCategories", async ({ name, data }) => {
    const response = await axios.put(`http://localhost:3300/api/petCategories/${name}`, data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
});

export const deleteCategories = createAsyncThunk("petCategory/deleteCategories", async (name) => {
    const response = await axios.delete(`http://localhost:3300/api/petCategories/${name}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
});

export const getCategoryById = createAsyncThunk("petCategory/getCategoryById", async (id) => {
    const response = await axios.get(`http://localhost:3300/api/petCategories/${id}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
});

export const petCategorySlice = createSlice({
    name: "petCategory",
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
                state.petCategories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })
            .addCase(createCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(createCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.petCategories.push(action.payload);
            })
            .addCase(createCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })
            .addCase(updateCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updateCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.petCategories = state.petCategories.map((petCategory) => {
                    if (petCategory.name === action.payload.name) {
                        return action.payload;
                    }
                    return petCategory;
                });
            })
            .addCase(updateCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })
            .addCase(deleteCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deleteCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.petCategories = state.petCategories.filter((petCategory) => petCategory.name !== action.payload.name);
            })
            .addCase(deleteCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })
            .addCase(getCategoryById.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.petCategory = action.payload;
                state.products = action.payload.products;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            });
    }
});

export const selectError = (state) => state.petCategory.isError;
export const selectIsLoading = (state) => state.petCategory.isLoading;
export const selectCategories = (state) => state.petCategory.petCategories;
export const selectPetCategory = (state) => state.petCategory.petCategory;
export const selectProducts = (state) => state.petCategory.products;

export default petCategorySlice.reducer;
