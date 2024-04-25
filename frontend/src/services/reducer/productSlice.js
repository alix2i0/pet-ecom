import {
    createSlice,
    createAsyncThunk,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios  from "axios";


const initialState = {
    product: [],
    isLoading: false,
    isError: null,
}


export const fetchProduct = createAsyncThunk("product/fetchProduct", async () => {
    console.log('hello');
    const response = await axios.get("http://localhost:3300/api/products",{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }});
        console.log("hello",response);
    return response.data;
})


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })

    },
})

export const selectError = (state) => state.error;
export const selectIsLoading = (state) => state.loading;
export const selectProduct = (state) => state.product;

export default productSlice.reducer