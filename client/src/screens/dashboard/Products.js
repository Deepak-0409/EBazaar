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
                <table className="w-full bg-gray-900 rounded-md">
                    <thead>
                        <tr className="border-b border-gray-500/[0.7] text-left">
                            <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
                            <th className="p-3 uppercase text-sm font-medium text-gray-500">price</th>
                            <th className="p-3 uppercase text-sm font-medium text-gray-500">stock</th>
                            <th className="p-3 uppercase text-sm font-medium text-gray-500">image</th>
                            <th className="p-3 uppercase text-sm font-medium text-gray-500">edit</th>
                            <th className="p-3 uppercase text-sm font-medium text-gray-500">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.products?.map(product => (
                            <tr key = {product._id}>
                                <td className="p-3 capitalize text-sm text-gray-400 hover:text-gray-200">{product.title}</td>
                                <td className="p-3 capitalize text-sm text-gray-400 hover:text-gray-200">{product.price}</td>
                                <td className="p-3 capitalize text-sm text-gray-400 hover:text-gray-200">{product.stock}</td>
                                <td className="p-3 capitalize text-sm text-gray-400 hover:text-gray-200">
                                    <img src={`/images/${product.image1}`} alt="image1.jpg" className="w-20 h-20 rounded-md object-cover hover:scale-125 cursor-pointer transition-all"/>
                                </td>
                                <td className="p-3 capitalize text-sm text-gray-400 hover:text-gray-200"><Link to={`/dashboard/edit-product/${product._id}`} className="btn-warning">edit</Link></td>
                                <td className="p-3 capitalize text-sm text-gray-400 hover:text-gray-200"><button className="btn-danger capitalize" onClick={() => deleteProduct(product._id)}>delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div><Pagination path ="dashboard/products/" page={parseInt(page)} perPage={data.perPage} count={data.count}/></> : "No Products" : <Spinner/>}

        </Wrapper>
    )
}

export default Products;