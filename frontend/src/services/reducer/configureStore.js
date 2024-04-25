import { configureStore } from '@reduxjs/toolkit'
import userSlice from './authSlice'



export const store = configureStore({
    reducer: {
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})