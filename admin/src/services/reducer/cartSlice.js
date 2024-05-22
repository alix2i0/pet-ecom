import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3300/api';

// Thunks for async operations
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
    const response = await axios.get(`${API_URL}/cart/${userId}`);
    return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }) => {
    const response = await axios.post(`${API_URL}/cart/${userId}`, { productId, quantity });
    return response.data;
});

export const updateCart = createAsyncThunk('cart/updateCart', async ({ userId, items }) => {
    const response = await axios.put(`${API_URL}/cart/${userId}`, { items });
    return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ userId, productId }) => {
    const response = await axios.delete(`${API_URL}/cart/${userId}/${productId}`);
    return response.data;
});

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        bill: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.bill = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.bill = action.payload.bill;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.bill = action.payload.bill;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.bill = action.payload.bill;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.bill = action.payload.bill;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
