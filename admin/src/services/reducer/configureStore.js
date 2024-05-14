// store.js
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import userSlice from './userSlice'
import categorySlice from './categorySlice'
import productSlice from './productSlice'




export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        category: categorySlice,
        product : productSlice

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
