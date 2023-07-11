import { Link, useParams } from "react-router-dom"
import ScreenHeader from "../../components/ScreenHeader"
import { useGetOrdersQuery } from "../../store/services/OrderService"
import Wrapper from "./Wrapper"
import Pagination from "../../components/Pagination"
import Spinner from "../../components/Spinner"

const Orders = () => {
    const {page = 1} = useParams();
    const { data, isFetching } = useGetOrdersQuery(page);
    return (
        <Wrapper>
            <ScreenHeader>Orders</ScreenHeader>
            {!isFetching ? data?.orders?.length > 0 &&
                <>
                    <div>
                        <table className="dashboard-table">
                            <thead>
                                <tr className="dashboard-tr">
                                    <th className="dashboard-th">Product</th>
                                    <th className="dashboard-th">Qty</th>
                                    <th className="dashboard-th">Image</th>
                                    <th className="dashboard-th">Delivery</th>
                                    <th className="dashboard-th">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.orders?.map(order => (
                                    <tr key={order._id}>
                                        <td className="dashboard-td">{order.productId.title}</td>
                                        <td className="dashboard-td">{order.quantities}</td>
                                        <td className="dashboard-td">
                                            <img src={`/images/${order.productId.image1}`} alt="image1.jpg" className="w-12 h-12 rounded-full mx-auto object-cover hover:scale-110 cursor-pointer transition-all"/>
                                        </td>
                                        <td className="dashboard-td">{order.received ? "Delivered" : "Not Delivered"}</td>
                                        <td className="dashboard-td">
                                            <Link to = "/dashboard" className = "btn-indigo uppercase font-normal text-sm py-2">Details</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <Pagination path="dashboard/orders/" page={parseInt(page)} perPage={data.perPage} count={data.count} />
                </> : <Spinner />}
        </Wrapper>
    )
}

export default Orders