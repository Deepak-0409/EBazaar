import { Link } from "react-router-dom";

const Sidebar = ({side,closeSidebar}) => {
    return(
        <div className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all duration-500`}>
            <i onClick={closeSidebar} className="fa-solid fa-xmark fa-xl text-black absolute top-10 right-4 block sm:hidden cursor-pointer"></i>
            <div className="flex justify-start h-14 bg-[#fff]  items-center py-10">
                <img className="ml-3 h-16 w-36" src="/Trendezy_logo.png" alt="logo.png" />
            </div>
            <ul className="mt-4">
                <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600 hover:transition-all ">
                <i className="fa-regular fa-rectangle-list fa-lg mr-2"></i><Link to="/dashboard/products" className="text-lg block w-full">Products</Link>
                </li>
                <li className="px-5 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600 hover:transition-all">
                <i className="fa-solid fa-bag-shopping fa-lg mr-3"></i><Link to="/dashboard/orders" className="text-lg block w-full">Orders</Link>
                </li>
                <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600 hover:transition-all">
                <i className="fa-solid fa-user-group fa-lg mr-2"></i><Link to="/dashboard/products" className="text-lg block w-full">Customers</Link>
                </li>
                <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600 hover:transition-all">
                <i className="fa-solid fa-tags fa-lg mr-3"></i><Link to="/dashboard/categories" className="text-lg block w-full">Categories</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;