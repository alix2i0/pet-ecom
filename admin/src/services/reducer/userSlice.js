import {
    createSlice,
    createAsyncThunk,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios  from "axios";


const initialState = {
    totalPages: 0,
    currentPage: 1,
    allUsers: [],
    isLoading: false,
    isError: null,
    CountUsers:0
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

export const getAllUsers = createAsyncThunk("user/getALLUsers", async (data) => {
    const { currentPage, limit, searchTerm, sortBy, sortOrder } = data;
    const url = `http://localhost:3300/api/users?page=${currentPage}&limit=${limit}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    const response = await axios.get(url, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.data;
})


export const createUser = createAsyncThunk("user/createUser", async (data) => {
    try {
    const response = await axios.post("http://localhost:3300/api/users/",data,{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });

    return response.data.data;
    } catch (error) {
        return error.response.data
    }
})


export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
    console.log("data",data);
    const response = await axios.put(`http://localhost:3300/api/users/${data.id}`,data,{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    return response.data.data;
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (data) => {
    const response = await axios.delete(`http://localhost:3300/api/users/${data}`,{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    console.log("response",response.data);
    return response.data.data;

})
export const CountUsers = createAsyncThunk("user/CountUsers", async () => {
    const response = await axios.get(`http://localhost:3300/api/users/count`,{
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    console.log("response",response.data);
    return response.data;

})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //GetAll users
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUsers = action.payload.users;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;

            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            //Create user
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUsers = [...state.allUsers, action.payload];
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            //Update user
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUsers = state.allUsers.map((user) => user._id === action.payload._id ? action.payload : user);
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            //Delete user
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;              
                state.allUsers = state.allUsers.filter((user) => user._id !== action.payload._id);
                console.log("state.allUsers",state.allUsers);
            })  
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            //Count users
            .addCase(CountUsers.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(CountUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.CountUsers = action.payload;
            })
            .addCase(CountUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })


    },
})

export const authActions = {
    fetchUser,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    CountUsers

}

export const selectUser = (state) => state.user.user;

export const selectAllUsers = (state) => state.user.allUsers;
export const selectCurrentPage  = (state) => state.user.currentPage ;

export const selectCountUsers = (state) => state.user.CountUsers;

export const selectLoading = (state) => state.loading;
export const selectError = (state) => state.error;
//Thunk actions
export default userSlice.reducer