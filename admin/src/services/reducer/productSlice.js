import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  categories: [],
  isLoading: false,
  isError: null,
  productDetails: null,
  count: 0,
  totalAmount: 0,
  CountOrders: 0,
  totalPages: 1,
  search: "",
  filters: {},
  sort: "",
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({ page, search, filters, sort }, { rejectWithValue }) => {
    try {
      const filterParams = new URLSearchParams();
      if (filters) {
        for (const key in filters) {
          filterParams.append(key, filters[key]);
        }
      }
      const response = await axios.get(
        `http://localhost:3300/api/products?page=${page}&limit=8&search=${search}&sort=${sort}&${filterParams.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async ({ productId }) => {
    console.log("getID",productId)
    const response = await axios.get(
      `http://localhost:3300/api/products/${productId}`
    );
    console.log('response : ', response.data);
    return response.data;
  }
);
export const fetchCategories = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await axios.get(`http://localhost:3300/api/categories`);
    console.log("categories : ", response.data.categories);
    return response.data.categories;
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

        headers : {
            'Content-Type' : 'application/json',
        }});
        console.log("slice",response.data);
    return response.data.count;

})

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
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilter(state, action) {
      state.filters = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.data || [];
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
      }) // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const selectError = (state) => state.error;
export const selectIsLoading = (state) => state.loading;
export const selectProduct = (state) => state.product;
export const selectProductDetails = (state) => state.products.productDetails;
export const selectCountProduct = (state) => state.count;
export const selectCountOrders = (state) => state.ordersCount;
export const selectTotalAmount = (state) => state.totalAmount;
export const selectTotalPages = (state) => state.product.totalPages;


export const { setSearch, setFilter, setSort } = productSlice.actions;
export const { setPage } = productSlice.actions;
export default productSlice.reducer;
