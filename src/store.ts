import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import cookieReducer from "slices/cookieSlice";
import cartReducer from "slices/cartSlice"; // 
import userReducer from "slices/userSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        cookie: cookieReducer,
        addresses_count: cartReducer, 
        user: userReducer
    },
});

// Тип для состояния приложения export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;