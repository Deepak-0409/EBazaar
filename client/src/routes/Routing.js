import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../screens/auth/AdminLogin";
import Categories from "../screens/dashboard/Categories";
import CreateCategory from "../screens/dashboard/CreateCategory";
import UpdateCategory from "../screens/dashboard/UpdateCategory";
import CreateProduct from "../screens/dashboard/CreateProduct";
import Products from "../screens/dashboard/Products";
import Private from "./Private";
import Public from "./Public";
import EditProduct from "../screens/dashboard/EditProduct";
import Home from "../screens/home/Home";
import Login from "../screens/home/auth/Login";
import Register from "../screens/home/auth/Register";
import Dashboard from "../screens/user/Dashboard";
import UserRoute from "./UserRoute";
import UserAuthRoute from "./UserAuthRoute";
import CategoryProducts from "../screens/home/CategoryProducts";
import Product from "../screens/home/Product";
import SearchProducts from "../screens/home/SearchProducts";
import Cart from "../screens/home/Cart";
import Orders from "../screens/dashboard/Orders";

const Routing = () =>{
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element ={<Home/>} />
                <Route path ="category-products/:name/:page?" element ={<CategoryProducts/>} />
                <Route path ="search-products/:keyword/:page?" element ={<SearchProducts/>} />
                <Route path ="product/:id" element ={<Product/>} />
                <Route path ="cart" element ={<Cart/>} />
                <Route element={<UserAuthRoute/>}>
                    <Route path ="login" element ={<Login/>} />
                    <Route path ="register" element ={<Register/>} />
                </Route>
                <Route element={<UserRoute/>}>
                    <Route path ="user" element ={<Dashboard/>} />
                </Route>
                <Route path="auth">
                    <Route path="admin-login" element =<Public> {<AdminLogin />} </Public> />
                </Route>
                <Route path="dashboard">
                    <Route path="products/:page?" element ={<Private> <Products /> </Private>} />
                    <Route path="edit-product/:id" element ={<Private> <EditProduct /> </Private>} />
                     <Route path="categories/:page?" element ={<Private> <Categories /> </Private>} />
                    <Route path="create-category" element ={<Private> <CreateCategory /> </Private>} />
                    <Route path="update-category/:id" element ={<Private> <UpdateCategory /> </Private>} />
                    <Route path="create-product" element ={<Private> <CreateProduct /> </Private>} />
                    <Route path="orders/:page?" element ={<Private> <Orders /> </Private>} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default Routing;