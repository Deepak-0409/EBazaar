import { Link } from "react-router-dom";
import {BiSearch,BiCart} from "react-icons/bi";

const Nav = () => {
    return(
        <div className="nav">
            <div className="my-container">
                <div className="flex justify-between items-center">
                    <Link to="/">
                        <img className="h-20 w-32 mb-3" src="/logo.png" alt="logo.png" />
                    </Link>
                    <ul className="flex items-center">
                        <li className="nav-li"><BiSearch size={25}/></li>
                        <li className="nav-li"><Link className="nav-link" to="/login">Sign In</Link></li>
                        <li className="nav-li relative">
                            <Link to="/cart">
                                <BiCart size={28}/>
                                <span className="nav-circle">10</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Nav;