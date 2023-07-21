import { useRef } from "react"
import ReactToPrint from 'react-to-print';
import { Link, useParams } from "react-router-dom"
import currency from "currency-formatter";
import moment from "moment";
import { BiArrowBack } from "react-icons/bi";
import { BsPrinterFill } from "react-icons/bs";
import { useDispatchOrderMutation, useGetOrderDetailsQuery } from "../../store/services/OrderService";
import ScreenHeader from "../../components/ScreenHeader"
import Wrapper from "./Wrapper"
import { discountPrice } from "../../utils/DiscountPrice";
import Spinner from "../../components/Spinner";

const OrderDetails = () => {
    const { id } = useParams();
    const { data, isFetching } = useGetOrderDetailsQuery(id);
    const [dispatchOrder,response] = useDispatchOrderMutation();
    const componentRef = useRef();
    const unitPrice = currency.format(discountPrice(data?.order.productId.price, data?.order.productId.discount), { code: "INR" });
    const totalPrice = currency.format(discountPrice(data?.order.productId.price, data?.order.productId.discount) * data?.order.quantities, { code: "INR" });

    const orderDispatch = () => {
        dispatchOrder(data?.order._id);
    }
    
    return (
        <Wrapper>
            <ScreenHeader>
                <div className="flex justify-between items-baseline">
                    <div className="flex items-center">
                        <Link to="/dashboard/orders"><BiArrowBack size={30} className="text-black-1000 btn-light p-1"/></Link>
                        <span className="ml-4 text-lg">Order Details</span>
                    </div>
                    <div className="mr-2 flex items-center">
                            <ReactToPrint
                                trigger={() => <button className="flex items-center btn-indigo py-2 text-sm mr-2 rounded-md"><BsPrinterFill size={20} className="mr-2"/>Print</button>}
                                content={() => componentRef.current}
                            />
                        {!isFetching && !data?.order?.status && <button className="btn-primary capitalize text-sm py-2" onClick={orderDispatch}>{response?.isLoading ? "Loading..." : "Ship order"}</button>}
                    </div>
                </div>
            </ScreenHeader>
            {!isFetching ?
                <div ref={componentRef}>
                    <h3 className="capitalize text-gray-200 font-semibold text-lg">
                        Order Number : <span className="text-lg font-semibold text-gray-400 ml-3">{`#${data?.order._id}`}</span>
                    </h3>
                    <h3 className="capitalize text-gray-200 font-semibold text-lg mt-3">
                        Product : <span className="text-lg font-semibold text-gray-400 ml-3 capitalize">{data?.order.productId.title}</span>
                    </h3>
                    <h3 className="capitalize text-gray-200 font-semibold text-lg mt-3">
                        Order Placed On : <span className="text-lg font-semibold text-gray-400 ml-3 capitalize">{moment(data?.order.createdAt).format("MMMM Do YYYY")}</span>
                    </h3>
                    {data?.order.received && 
                        <h3 className="capitalize text-gray-200 font-semibold text-lg mt-3">
                            Order Received On : <span className="text-lg font-semibold text-gray-400 ml-3 capitalize">{moment(data?.order.updatedAt).format("MMMM Do YYYY")}</span>
                        </h3>    
                    }
                    <div className="flex flex-wrap -mx-5 overflow-x-auto">
                        <div className="w-full p-5">
                            <div>
                                <table className="dashboard-table rounded-none md:rounded-md">
                                    <thead>
                                        <tr className="dashboard-tr">
                                            <th className="dashboard-th">Image</th>
                                            <th className="dashboard-th">Qty</th>
                                            <th className="dashboard-th">Price</th>
                                            <th className="dashboard-th">Color</th>
                                            <th className="dashboard-th">Size</th>
                                            <th className="dashboard-th">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="dashboard-td">
                                                <img src={`/images/${data?.order.productId.image1}`} alt="image1.jpg" className="w-12 h-12 rounded-md mx-auto object-cover hover:scale-110 cursor-pointer transition-all" />
                                            </td>
                                            <td className="dashboard-td">{data?.order.quantities}</td>
                                            <td className="dashboard-td">{unitPrice}</td>
                                            <td className="dashboard-td">
                                                <span className="block w-6 h-6 rounded-full mx-auto" style={{background: data?.order?.color}}></span>
                                            </td>
                                            <td className="dashboard-td">{data?.order?.size==="false" ? "-" : data?.order.size}</td>
                                            <td className="dashboard-td">{totalPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-full p-5">
                            <div className="bg-gray-900 rounded-none md:rounded-md p-4">
                                <div className="border-b pb-3 border-b-gray-500/[0.7]">
                                    <h4 className="capitalize text-base text-gray-500">customer name</h4>
                                    <span className="text-gray-400 text-base font-medium capitalize tracking-wide">
                                        {data?.order.userId.name}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="capitalize text-base text-gray-500 mt-2">Shipping details</h4>
                                    <div className="mt-2 leading-relaxed">
                                        <span className="text-gray-400 capitalize block tracking-wider">{data?.order.address.city}</span>
                                        <span className="text-gray-400 capitalize block tracking-wider">{data?.order.address.line1}</span>
                                        <span className="text-gray-400 capitalize block tracking-wider">{data?.order.address.line2}</span>
                                        <span className="text-gray-400 capitalize block tracking-wider">{`${data?.order.address.state}, ${data?.order.address.postal_code}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <Spinner />}
        </Wrapper>
    )
}

export default OrderDetails