import {BsSearch} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { motion } from "framer-motion";
import { toggleSearchBar } from "../../store/reducers/globalReducer";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const {searchBar} = useSelector((state)=>state.globalReducer);
    const [value,setValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const closeSearch = e =>{
        const id = e.target.getAttribute("id");
        id==="search" && dispatch(toggleSearchBar());
    }
    const searchProducts = () =>{
        if(value==="") return alert("Please enter a product name");
        navigate(`/search-products/${value}/1`);
        dispatch(toggleSearchBar());
    }
    return searchBar && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 w-full h-full bg-black-1000/50 z-[300]" id="search" onClick={closeSearch}>
            <div className="flex -mx-8 justify-center">
                <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 px-8 mt-10 relative">
                    <input type="text" name="" id="" className="w-full bg-white h-12 rounded-md outline-none pl-5 pr-16" placeholder="Search Products" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <BsSearch className="absolute top-[12px] right-16 text-2xl cursor-pointer" onClick={searchProducts}/>
                </div>
            </div>
        </motion.div>
    )
}

export default Search