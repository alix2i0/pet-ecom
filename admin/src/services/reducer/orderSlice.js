// orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orders: [],
    recentorders: [],
    mostPopularProduct: [],
    isLoading: false,
    isError: null,
}

export const GetOrders = createAsyncThunk("orders/getOrders", async () => {
    try {
        const response = await axios.get("http://localhost:3300/api/orders/", {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
     
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
});
export const RecentOrders = createAsyncThunk("orders/getRecentOrders", async () => {
    try {
        const response = await axios.get("http://localhost:3300/api/orders/RO", {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching recent orders:", error);
        throw error;
    }
});

export const mostPopularProduct = createAsyncThunk("orders/getPopularProducts", async () => {
    try {
        const response = await axios.get("http://localhost:3300/api/products/populare", {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching popular products:", error);
        throw error;
    }
});

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetOrders.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(GetOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload.orders; // Update with orders from response data
            })
            .addCase(GetOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message; // Update with error message
            })
            .addCase(RecentOrders.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(RecentOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recentorders = action.payload;
            })
            .addCase(RecentOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message; // Update with error message
            })
            .addCase(mostPopularProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(mostPopularProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.mostPopularProduct = action.payload;
            })
            .addCase(mostPopularProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message; // Update with error message
            })
    },
});

export default orderSlice.reducer;
