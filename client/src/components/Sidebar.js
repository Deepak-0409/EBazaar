import { Link } from "react-router-dom";

const Sidebar = ({side,closeSidebar}) => {
    return(
        <div className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all`}>
            <i onClick={closeSidebar} className="fa-solid fa-xmark fa-xl text-black absolute top-8 right-4 block sm:hidden cursor-pointer"></i>
            <div className="flex justify-start h-14 py-8 bg-gray-100  items-center">
                <img className="h-10 w-16" src="/logo.png" alt="logo" />
                <span className="font-bold text-2xl font-brandTitle text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-purple-600 to-fuchsia-400">E-Bazaar</span>
            </div>
            <ul className="mt-4">
                <li className="px-4 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600 hover:transition-all ">
                <i className="fa-regular fa-rectangle-list fa-lg mr-2"></i><Link to="/dashboard/products" className="text-lg block w-full">Products</Link>
                </li>
                <li className="px-5 py-3 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600 hover:transition-all">
                <i className="fa-solid fa-bag-shopping fa-lg mr-3"></i><Link to="/dashboard/products" className="text-lg block w-full">Orders</Link>
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