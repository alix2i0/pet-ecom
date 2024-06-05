// authSlice.js
import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

import {
  auth,
  provider,
  signInWithPopup,
} from "../../../../frontend/src/lib/firebase";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  auth: JSON.parse(localStorage.getItem("auth")) || null,
  userId: localStorage.getItem('userId') || null,
  isLoading: false,
  isError: null,
  admin: false,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await axios.get("http://localhost:3300/api/auth/profile", {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return response.data.data;
});

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3300/api/auth/login",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response ", response);

    // Stockage de l'authentification dans le localStorage
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userId', response.data.userId);

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axios.get("http://localhost:3300/api/auth/logout", {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response logout ", response.data);
  localStorage.removeItem("isAuthenticated");
  return response.data;
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data) => {
    try {
      console.log("data", data);
      const response = await axios.post(
        "http://localhost:3300/api/auth/forgotPassword",
        data
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

export const passwordReset = createAsyncThunk(
  "auth/passwordReset",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3300/api/auth/passwordReset/${data.token}`,
        data
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk("auth/register", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3300/auth/register",
      data
    );
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response.data);
  }
});

// Google Login
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // Optionally, send the user data to your backend
    // const response = await axios.post("http://localhost:3300/api/auth/googleLogin", { user });
    // return response.data;

    // For now, just return the user data directly
    return {
      success: true,
      user: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        accessToken: user.accessToken,
      },
    };
  } catch (error) {
    return isRejectedWithValue(error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Login auth
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.auth = action.payload;
          state.isAuthenticated = true;
          state.userId = action.payload.userId;
          state.admin = action.payload.role;
        } else {
          state.isError = action.payload;
        }
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
        state.auth = null;
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
        state.auth = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      //Forgot Password
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auth = action.payload;
      })

      //Password Reset
      .addCase(passwordReset.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auth = action.payload;
      })
      .addCase(passwordReset.rejected, (state, action) => {
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
        state.auth = action.payload;
        if (action.payload.success) {
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.auth = action.payload.user;
          state.isAuthenticated = true;
          localStorage.setItem("isAuthenticated", JSON.stringify(true));
          localStorage.setItem("auth", JSON.stringify(action.payload.user));
        } else {
          state.isError = action.payload;
        }
      })
      .addCase(googleLogin.rejected, (state, action) => {
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
  forgotPassword,
  passwordReset,
  googleLogin,
};

export const selectUser = (state) => state.auth.auth;
export const selectLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.isError;
export const selectAuth = (state) => state.auth.isAuthenticated;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
