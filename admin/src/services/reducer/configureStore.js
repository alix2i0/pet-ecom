// store.js
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import userSlice from './userSlice'
import categorySlice from './categorySlice'
import productSlice from './productSlice'
import petSlice from './petSlice'
import petCategorySlice from './petCategorySlice';
import orderSlice from './orderSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        category: categorySlice,
        product : productSlice,
        pets: petSlice,
        petCategory : petCategorySlice,
        orders: orderSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
