import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import currency from "currency-formatter";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import Account from "../../components/home/Account";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { useGetOrdersQuery, useReceiveOrderMutation } from "../../store/services/userOrderService";
import { discountPrice } from "../../utils/DiscountPrice";


const UserOrders = () => {
    const {page=1} = useParams();
    const {user} = useSelector(state => state.authReducer);  
    const {data,isFetching} = useGetOrdersQuery({page, userId: user.id});
    const [upateOrderStatus] = useReceiveOrderMutation();
    
    const receiveOrder = (id) => {
        upateOrderStatus(id);
    }; 
    

    return (
        <>
            <Nav />
            <div className="">
                <Header>
                    My Orders
                </Header>
                <div className="my-container mt-20 pb-32">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full md:w-4/12 p-6">
                            <Account />
                        </div>
                        <div className="w-full md:w-8/12 p-6">
                            <h1 className="heading mb-6">orders</h1> 
                            {!isFetching ? data?.orders?.length>0 ?
                                <>
                                    <div className="table-container">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="table-tr bg-gray-300">
                                                    <th className="table-th">Image</th>
                                                    <th className="table-th">Name</th>
                                                    <th className="table-th">Total</th>
                                                    <th className="table-th">Status</th>
                                                    <th className="table-th">Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.orders.map( item => {
                                                    const totalPrice = currency.format(discountPrice(item.productId.price,item.productId.discount)*item.quantities,{code:"INR"})
                                                    const unitPrice = currency.format(discountPrice(item.productId.price,item.productId.discount),{code:"INR"})
                                                    return (
                                                        <tr key={item._id}>
                                                            <td className="table-td">
                                                                <img src={`/images/${item.productId.image1}`} alt={item.productId.title} className="w-16 h-16 object-cover rounded-lg mx-auto"/>
                                                            </td>
                                                            <td className="table-td font-medium">{item.productId.title}</td>
                                                            <td className="table-td font-bold text-gray-900">{totalPrice} </td>
                                                            <td className="table-td">
                                                                {item.status===false ?  
                                                                    <span className="capitalize font-semibold text-sm text-red-600">Not shipped yet</span>
                                                                    : item.received===true ?
                                                                    <span className="capitalize font-semibold text-sm text-emerald-500">Delivered</span>: 
                                                                    <button className = "btn-indigo bg-yellow-400 hover:bg-yellow-500 capitalize font-semibold text-xs md:text-sm py-2 mx-atuo" onClick = {() => receiveOrder(item._id)} disabled={item.received}>Received</button>
                                                                }
                                                            </td>
                                                            <td className="table-td">
                                                                <Link to = {`/user-order-details/${item._id}`} className = "btn-indigo capitalize font-semibold text-xs md:text-sm py-2 mx-atuo">Details</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-center">
                                        <Pagination path ={`orders/`} page={parseInt(page)} perPage={data.perPage} count={data.count} theme="light"/> 
                                    </div>
                                </> 
                            : (
                                <div className="capitalize bg-yellow-50 border border-yellow-100 rounded px-4 py-2.5 text-yellow-500 font-semibold text-base">No orders</div>
                            ) : <Spinner/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrders