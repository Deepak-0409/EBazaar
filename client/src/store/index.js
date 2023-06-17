import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import categoryService from "./services/categoryServices";
import productService from "./services/productService";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";

const store = configureStore({
    reducer:{
        [authService.reducerPath]: authService.reducer,
        [categoryService.reducerPath]: categoryService.reducer,
        [productService.reducerPath]: productService.reducer,
        "authReducer":authReducer,
        "globalReducer":globalReducer
    },
    middleware: (getDefaultMiddleware) =>
    {
        return getDefaultMiddleware().concat(categoryService.middleware, authService.middleware, productService.middleware)
    }
}); 

export default store;