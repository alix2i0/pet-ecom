import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3300/api/wishes';

// Thunks for async operations
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (userId) => {
    const response = await axios.get(`${API_URL}/wishlist/${userId}`);
    return response.data;
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async ({ userId, productId }) => {
    console.log('addToWishlist', userId, productId);
    const response = await axios.post(`${API_URL}/wishlist/${userId}/${productId}`);
    return response.data;
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async ({ userId, productId }) => {
    const response = await axios.delete(`${API_URL}/wishlist/${userId}/${productId}`);
    return response.data;
});

// Slice
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.items = action.payload.items;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = action.payload.items;
            });
    },
});

export default wishlistSlice.reducer;
