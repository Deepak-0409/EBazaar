import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import categoryService from "./services/categoryServices";
import productService from "./services/productService";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import homeProducts from "./services/homeProducts";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
    reducer:{
        [authService.reducerPath]: authService.reducer,
        [categoryService.reducerPath]: categoryService.reducer,
        [productService.reducerPath]: productService.reducer,
        [homeProducts.reducerPath]: homeProducts.reducer,
        "authReducer":authReducer,
        "globalReducer":globalReducer,
        "cartReducer":cartReducer
    },
    middleware: (getDefaultMiddleware) =>
    {
        return getDefaultMiddleware().concat(categoryService.middleware, authService.middleware, productService.middleware, homeProducts.middleware)
    }
}); 

export default store;