// userSlice.js
import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: null,
  isLoading: false,
  isError: null,
  admin: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("http://localhost:3300/api/auth/profile", {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
});

export const login = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post("http://localhost:3300/api/auth/login", data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Stockage de l'authentification dans le localStorage
    localStorage.setItem('isAuthenticated', true);

    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.get("http://localhost:3300/auth/logout");
  localStorage.removeItem('isAuthenticated');
  return response.data;
});

export const register = createAsyncThunk("user/register", async (data) => {
  try {
    const response = await axios.post("http://localhost:3300/auth/register", data);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response.data);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Login User
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.admin = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      //Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      //Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      //Profile
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        if (action.payload.success) {
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const authActions = {
  fetchUser,
  login,
  logout,
  register,
};

export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.isError;
export const selectAuth = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
