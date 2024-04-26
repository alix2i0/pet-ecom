import {
    createSlice,
    createAsyncThunk,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios  from "axios";


const initialState = {
    isAuthenticated : false,
    user: null,
    isLoading: false,
    isError: null,
    admin: false
}

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const response = await axios.get("http://localhost:3300/api/auth/profile",{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    return response.data.data;
})


e

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
                console.log('admin',state.admin);

            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            //Logout
            
    },
})

export const authActions = {
    fetchUser,
    login,
    logout,
    register
}

export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.loading;
export const selectError = (state) => state.error;
//Thunk actions
export default userSlice.reducer