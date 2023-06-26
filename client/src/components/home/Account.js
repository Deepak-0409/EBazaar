import { NavLink } from "react-router-dom"
import {BsPersonCircle} from "react-icons/bs";
import {BiCart,BiLogOut} from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authReducer";
 
const Account = () => {
    const dispatch = useDispatch();
    return (
        <>
            <NavLink to="/user" exact activeClassName="active" className="account-list">
                <BsPersonCircle size={24}/>
                <span className="account-list-title ">my account</span>
            </NavLink>
            <NavLink to="/orders" activeClassName="active" className="account-list">
                <BiCart size={26}/>
                <span className="account-list-title ">orders</span>
            </NavLink>
            <span className="account-list cursor-pointer" onClick={()=> dispatch(logout("user-token"))}>
                <BiLogOut size={26}/>
                <span className="account-list-title">logout</span>
            </span>
        </>
    )
}

export default Account