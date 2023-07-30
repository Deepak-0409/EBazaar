import { Link } from "react-router-dom";
import { BiSearch, BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchBar } from "../../store/reducers/globalReducer";
import Search from "./Search";

const Nav = () => {
    const { userToken, user } = useSelector(state => state.authReducer)
    const { items } = useSelector(state => state.cartReducer)
    const dispatch = useDispatch();
    
    return (
        <>
            <div className="nav">
                <div className="my-container">
                    <div className="flex justify-between items-center">
                        <Link to="/">
                            <img className=" h-14 w-24 md:h-[68px] md:w-[7rem] lg:h-16 lg:w-36 inline" src="/Trendezy_logo.png" alt="logo.png" />
                        </Link>
                        <ul className="flex items-center justify-between">
                            <li className="user-nav-item">
                                <Link to="/" >
                                    <span className="sm:text-base lg:text-xl text-[#0C1327] font-medium ">Home</span>
                                </Link>
                            </li>
                            <li className="user-nav-item" >
                                <Link to="/about">
                                    <span className="sm:text-base lg:text-xl text-[#0C1327] font-medium">About Us</span>
                                </Link>
                            </li>
                            <li className="user-nav-item" >
                                <a href="/#footer" className="sm:text-base lg:text-xl text-[#0C1327] font-medium cursor-pointer"  >Contact Us</a>
                            </li>
                        </ul>
                        <ul className="flex items-center">
                            <li className="nav-li"><BiSearch size={25} onClick={() => dispatch(toggleSearchBar())} /></li>

                            {userToken ? <li className="nav-li">
                                <Link className="nav-link" to="/user">{user?.name}</Link>
                            </li> : <li className="nav-li">
                                <Link className="nav-link" to="/login">Sign In</Link>
                            </li>}

                            <li className="nav-li relative">
                                <Link to="/cart">
                                    <BiCart size={28} />
                                    <span className="nav-circle">{items}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Search />
        </>
    )
}

export default Nav;