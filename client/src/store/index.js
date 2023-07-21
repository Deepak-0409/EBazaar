import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import categoryService from "./services/categoryServices";
import productService from "./services/productService";
import paymentService from "./services/paymentService";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import homeProducts from "./services/homeProducts";
import cartReducer from "./reducers/cartReducer";
import orderService from "./services/OrderService";
import userOrderService from "./services/userOrderService";

const store = configureStore({
    reducer:{
        [authService.reducerPath]: authService.reducer,
        [categoryService.reducerPath]: categoryService.reducer,
        [productService.reducerPath]: productService.reducer,
        [paymentService.reducerPath]: paymentService.reducer,
        [homeProducts.reducerPath]: homeProducts.reducer,
        [orderService.reducerPath]: orderService.reducer,
        [userOrderService.reducerPath]: userOrderService.reducer,
        "authReducer":authReducer,
        "globalReducer":globalReducer,
        "cartReducer":cartReducer
    },
    middleware: (getDefaultMiddleware) =>
    {
        return getDefaultMiddleware().concat([
            categoryService.middleware,
            authService.middleware,
            productService.middleware,
            homeProducts.middleware,
            paymentService.middleware,
            orderService.middleware,
            userOrderService.middleware])
    }
}); 

export default store;