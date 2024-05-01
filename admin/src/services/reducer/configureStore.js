import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import userSlice from './userSlice'
import categorySlice from './categorySlice'




export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        category: categorySlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})