import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  isLoading: false,
  isError: null,
  count: 0,
  totalAmount: 0,
  CountOrders: 0,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    console.log("hello");
    const response = await axios.get("http://localhost:3300/api/products", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("hello", response);
    return response.data;
  }
);
//create a new product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/products",
        productData
      );
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

//update product by id
export const updateProductById = createAsyncThunk(
  "product/updateProductById",
  async ({ productId, productData }) => {
    try {
      const response = await axios.put(
        `http://localhost:3300/api/products/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

//delete product by id
export const deleteProductById = createAsyncThunk(
  "product/deleteProductById",
  async (productId) => {
    try {
      await axios.delete(`http://localhost:3300/api/products/${productId}`);
      return productId;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

// Count Product

export const CountProducts = createAsyncThunk(
  "product/CountProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:3300/api/products/count",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);
// Count Order

export const CountOrders = createAsyncThunk("product/CountOrders", async () => {
  const response = await axios.get("http://localhost:3300/api/orders/count", {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
});

//Count total Amount

export const CountTotalAmount = createAsyncThunk(
  "product/CountTotalAmount",
  async () => {
    const response = await axios.get(
      "http://localhost:3300/api/orders/totalAmount",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //product fetch
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
      //create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      //update product
      .addCase(updateProductById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      //delete product
      .addCase(deleteProductById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Count Product
      .addCase(CountProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(CountProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload;
      })
      .addCase(CountProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Count Orders
      .addCase(CountOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(CountOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersCount = action.payload;
      })
      .addCase(CountOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // Count Total Amount
      .addCase(CountTotalAmount.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(CountTotalAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalAmount = action.payload;
      })
      .addCase(CountTotalAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});
export const selectIsLoading = (state) => state.product.isLoading;
export const selectProducts = (state) => state.product.products;
export const selectError = (state) => state.product.isError;

// export const selectError = (state) => state.error;
// export const selectIsLoading = (state) => state.loading;
// export const selectProduct = (state) => state.product;
export const selectCountProduct = (state) => state.count;
export const selectCountOrders = (state) => state.ordersCount;
export const selectTotalAmount = (state) => state.totalAmount;

export default productSlice.reducer;
