import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/authReducer";

const AdminNav = ({openSidebar}) =>{
    const dispatch = useDispatch();
    const adminLogout = () => {
        dispatch(logout());
    }
    return (
        <nav className="fixed left-0 sm:left-64 top-4 right-0 mx-4 ">
            <div className="bg-gray-800 w-full flex justify-between sm:justify-end items-center p-4">
                <i onClick={openSidebar} className="fa-xl fa-solid fa-bars text-white sm:hidden block cursor-pointer"></i>
                <button onClick={adminLogout} className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Logout</button>
            </div>
        </nav>
    )
}

export default AdminNav;