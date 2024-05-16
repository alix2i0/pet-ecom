import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import userSlice from './userSlice'
import categorySlice from './categorySlice'
import productSlice from './productSlice'
import petSlice from './petSlice'
import petCategorySlice from './petCategorySlice';




export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        category: categorySlice,
        product : productSlice,
        pets: petSlice,
        petCategory : petCategorySlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})