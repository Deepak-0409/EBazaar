import Wrapper from "./Wrapper";
import { Link,useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../store/reducers/globalReducer";
import toast,{ Toaster } from "react-hot-toast";
import { useDeleteProductMutation, useGetProductsQuery } from "../../store/services/productService";
import Spinner from "../../components/Spinner";
import ScreenHeader from "../../components/ScreenHeader";
import Pagination from "../../components/Pagination";

const Products = () => {
    
    let {page} = useParams();
    if(!page)
    {
        page=1;
    }
    const {data=[],isFetching} = useGetProductsQuery(page);
    const {success} = useSelector(state => state.globalReducer);
    const dispatch = useDispatch();
    useEffect(() =>{
        if(success){
            toast.success(success);
        }
        return  () =>{
            dispatch(clearMessage);
        }
         // eslint-disable-next-line
    },[])

    const [delProduct, response] = useDeleteProductMutation();
    const deleteProduct = id =>{
        if(window.confirm("Are you sure?")){
            delProduct(id);
        }
    }
    return(
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/create-product" className="btn-light text-black-1000">Create Product</Link>            
                <Toaster position="top-right"/>
            </ScreenHeader>

            {!isFetching ? data?.products?.length > 0 ? <><div>
                <table className="dashboard-table">
                    <thead>
                        <tr className="dashboard-tr">
                            <th className="dashboard-th">name</th>
                            <th className="dashboard-th">price</th>
                            <th className="dashboard-th">stock</th>
                            <th className="dashboard-th">image</th>
                            <th className="dashboard-th">edit</th>
                            <th className="dashboard-th">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.products?.map(product => (
                            <tr key = {product._id}>
                                <td className="dashboard-td">{product.title}</td>
                                <td className="dashboard-td">{product.price}</td>
                                <td className="dashboard-td">{product.stock}</td>
                                <td className="dashboard-td">
                                    <img src={`/images/${product.image1}`} alt="image1.jpg" className="w-20 h-20 rounded-md mx-auto object-cover hover:scale-110 cursor-pointer transition-all"/>
                                </td>
                                <td className="dashboard-td"><Link to={`/dashboard/edit-product/${product._id}`} className="btn-warning">edit</Link></td>
                                <td className="dashboard-td"><button className="btn-danger capitalize" onClick={() => deleteProduct(product._id)}>delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div><Pagination path ="dashboard/products/" page={parseInt(page)} perPage={data.perPage} count={data.count}/></> : "No Products" : <Spinner/>}

        </Wrapper>
    )
}

export default Products;