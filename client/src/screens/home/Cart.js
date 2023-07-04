import { useDispatch, useSelector } from "react-redux"
import { BsTrashFill } from "react-icons/bs";
import { motion } from "framer-motion";
import currency from "currency-formatter";
import Nav from "../../components/home/Nav"
import { discountPrice } from "../../utils/DiscountPrice";
import { incQuantity,decQuantity, rmvItem } from "../../store/reducers/cartReducer";
import Quantity from "../../components/home/Quantity";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const {cart,total} = useSelector(state => state.cartReducer);
    const {userToken} = useSelector(state => state.authReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inc = (id) => {
        dispatch(incQuantity(id));
    }

    const dec = (id) => {
        dispatch(decQuantity(id));
    }

    const removeItem = (id) => {
        if(window.confirm("Are you sure you want to delete this item ?"))
        {
            dispatch(rmvItem(id));
        } 
    }

    const makePayment = () => {
        if(userToken)
        {
            
        }
        else
        {
            navigate("/login");
        }
    }

    return (
        <>
            <Nav/> 
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="my-container mt-28">
                {cart.length>0 ?
                    <>
                        <div className="table-container">
                            <table className="w-full">
                                <thead>
                                    <tr className="table-tr">
                                        <th className="table-th">Image</th>
                                        <th className="table-th">Name</th>
                                        <th className="table-th">Color</th>
                                        <th className="table-th">Size</th>
                                        <th className="table-th">Price</th>
                                        <th className="table-th">Qty.</th>
                                        <th className="table-th">Total</th>
                                        <th className="table-th">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map( item => {
                                        const totalPrice = currency.format(discountPrice(item.price,item.discount)*item.quantity,{code:"INR"})
                                        return (
                                            <tr key={item._id}>
                                                <td className="table-td">
                                                    <img src={`/images/${item.image1}`} alt={item.title} className="w-16 h-16 object-cover rounded-lg mx-auto"/>
                                                </td>
                                                <td className="table-td font-medium">{item.title}</td>
                                                <td className="table-td font-medium ">
                                                    <span className="mx-auto block w-4 h-4 rounded-full" style={{backgroundColor: item.color}}></span>
                                                </td>
                                                <td className="table-td font-medium ">
                                                    <span className="font-semibold">{item.size}</span>
                                                </td>
                                                <td className="table-td font-bold text-gray-900">{currency.format(discountPrice(item.price,item.discount),{code:"INR"})}</td>
                                                <td className="table-td flex justify-center"><Quantity quantity={item.quantity} inc={() => inc(item._id)} dec={() => dec(item._id)}/> </td>
                                                <td className="table-td font-bold text-gray-900">{totalPrice} </td>
                                                <td>
                                                    <span className="cursor-pointer" onClick={()=>removeItem(item._id)}>
                                                        <BsTrashFill className="mx-auto text-2xl text-black-950 hover:text-red-600 transition-all" />
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-emerald-50 p-4 flex justify-end rounded-md mt-5">
                            <div>
                                <span className="text-md font-semibold text-green-600 mr-12">{currency.format(total,{code:"INR"})}</span>
                                <button className="btn-primary text-sm uppercase" onClick={makePayment}>Checkout</button>
                            </div>
                        </div> 
                    </>
                : (
                    <div className="h-[70vh] flex flex-col items-center justify-center">
                        <img src="/cart.jpg" alt="" className="w-[70vh] h-[50vh] object-cover"/>
                        <p className="mt-5 capitalize font-bold font-[Kalam] text-4xl text-[#304f90]/30">Why it's still empty huh ?</p>
                    </div>
                )}
            </motion.div>
        </>
    )
}

export default Cart