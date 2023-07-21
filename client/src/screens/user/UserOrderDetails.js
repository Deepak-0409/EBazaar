import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import currency from "currency-formatter";
import { BiArrowBack } from "react-icons/bi";
import {BsStarFill} from "react-icons/bs"
import moment from "moment";
import toast, { Toaster } from 'react-hot-toast';
import Account from "../../components/home/Account"
import Header from "../../components/home/Header"
import Nav from "../../components/home/Nav"
import Spinner from "../../components/Spinner"
import { useGetOrderDetailsQuery, useReceiveOrderMutation } from "../../store/services/userOrderService"
import { discountPrice } from "../../utils/DiscountPrice";
import ReviewForm from "../../components/ReviewForm";

const UserOrderDetails = () => {
    const { id } = useParams();
    const { data, isFetching } = useGetOrderDetailsQuery(id);
    const unitPrice = currency.format(discountPrice(data?.order.productId.price, data?.order.productId.discount), { code: "INR" });
    const totalPrice = currency.format(discountPrice(data?.order.productId.price, data?.order.productId.discount) * data?.order.quantities, { code: "INR" });
    const navigate = useNavigate();
    const [stars, setStars] = useState(0);
    const [hoverStars, setHoverStars] = useState(0);
    const [viewState, setViewState] = useState(false);
    const [upateOrderStatus] = useReceiveOrderMutation();
    
    const handleMouseEnter = (idx) => {
        setHoverStars(idx);
    }
    const handleMouseLeave = (rating) => {
        setHoverStars(rating);
    }
    const toggleView = (idx) => {
        setStars(idx);
        setViewState(!viewState);
    }
    const showToast = (msg) => {
        toast.success(msg);
    }
    
    const receiveOrder = (id) => {
        upateOrderStatus(id);
    }; 

    console.log(data?.order);
    return (
        <>
            <ReviewForm value={stars} viewState={viewState} toggleView={toggleView} data={data} setToast={showToast}/>
            <Nav />
            <Toaster position="top-right" reverseOrder={false}/>
            <div className="">
                <Header>
                    My Account
                </Header>
                <div className="my-container mt-20 pb-32">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full md:w-4/12 p-6">
                            <Account />
                        </div>
                        <div className="w-full md:w-8/12 p-6">
                            <div className="flex items-center border-b-2 border-b-neutral-500/[0.2] py-3">
                                <span onClick={() => navigate(-1)} className="cursor-pointer"><BiArrowBack size={26} className="text-black-1000" /></span>
                                <span className="ml-4 text-lg font-medium">Order Details</span>
                            </div>
                            {!isFetching ?
                                <div className="flex flex-col md:flex-row flex-wrap mt-6">
                                    <div className="overflow-hidden w-28 h-28 md:w-40 md:h-40">
                                        <img src={`/images/${data?.order?.productId.image1}`} alt="" className="w-full h-full object-cover rounded-md" />
                                    </div>
                                    <div className="flex-1 md:my-0 my-4 md:ml-4">
                                        <div className="flex items-baseline">
                                            <h4 className="capitalize text-lg font-semibold text-gray-900">Order Id: </h4>
                                            <span className="ml-2 font-medium text-gray-500">{data?.order._id}</span>
                                        </div>
                                        <div className="flex items-baseline mt-1">
                                            <h4 className="capitalize text-lg font-semibold text-gray-900">Product Name: </h4>
                                            <span className="ml-2 font-medium text-gray-500 capitalize">{data?.order?.productId.title}</span>
                                        </div>
                                        <div className="flex items-baseline mt-1">
                                            <h4 className="capitalize text-lg font-semibold text-gray-900">Ordered Placed On: </h4>
                                            <span className="ml-2 font-medium text-gray-500 capitalize">{moment(data?.order?.createdAt).format("MMMM Do YYYY")}</span>
                                        </div>
                                        {data?.order?.received &&
                                            <div className="flex items-baseline mt-1">
                                                <h4 className="capitalize text-lg font-semibold text-gray-900">Ordered Delivered On: </h4>
                                                <span className="ml-2 font-medium text-gray-500 capitalize">{moment(data?.order?.updatedAt).format("MMMM Do YYYY")}</span>
                                            </div>
                                        }
                                        {data?.order?.received && !data?.order?.review &&
                                            <div className="flex items-center mt-1">
                                                <h4 className="text-lg font-semibold text-gray-900">Rate this product: </h4>
                                                <div className="flex items-center justify-around">
                                                    {[...Array(5)].map((star, idx) => {
                                                        idx += 1;
                                                        return (
                                                            <button
                                                                type="button"
                                                                key={idx}
                                                                className="mx-1.5"
                                                                onClick={() => toggleView(idx)}
                                                                onMouseEnter={() => handleMouseEnter(idx)}
                                                                onMouseLeave={() => handleMouseLeave(stars)}
                                                            >
                                                                <span><BsStarFill size={20} className={idx <= ((stars && hoverStars) || hoverStars) ? "text-[#ffdf00]" : "text-gray-600/40" } /></span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                            </div>
                                        }
                                        <div className="overflow-x-auto table-container mt-4">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="table-tr bg-gray-300">
                                                        {data?.order?.color !== "false" && <th className="table-th">Color</th>}
                                                        {data?.order?.size !== "false" && <th className="table-th">Size</th>}
                                                        <th className="table-th">Price</th>
                                                        <th className="table-th">Qty.</th>
                                                        <th className="table-th">Total</th>
                                                        <th className="table-th">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        {data?.order?.color!== "false" && 
                                                            <td className="table-td">
                                                                <span className="mx-auto block w-4 h-4 rounded-full" style={{ backgroundColor: data?.order?.color }}></span>
                                                            </td>
                                                        }
                                                        {data?.order?.size !== "false" && <td className="table-td font-medium">{data?.order?.size}</td>}
                                                        <td className="table-td font-bold text-gray-900">{unitPrice}</td>
                                                        <td className="table-td font-medium">{data?.order.quantities}</td>
                                                        <td className="table-td font-bold text-gray-900">{totalPrice}</td>
                                                        <td className="table-td">
                                                                {data?.order.status===false ?  
                                                                    <span className="capitalize font-semibold text-sm text-red-600">Not shipped yet</span>
                                                                    : data?.order.received===true ?
                                                                    <span className="capitalize font-semibold text-sm text-emerald-500">Delivered</span>: 
                                                                    <button className = "btn-indigo bg-yellow-400 hover:bg-yellow-500 capitalize font-semibold text-xs md:text-sm py-2 mx-atuo" onClick = {() => receiveOrder(data?.order._id)} disabled={data?.order.received}>Received</button>
                                                                }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                : <Spinner />}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrderDetails