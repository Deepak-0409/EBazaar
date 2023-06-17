import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { setSuccess, clearMessage } from "../../store/reducers/globalReducer";
import { useGetQuery, useDeleteCategoryMutation } from "../../store/services/categoryServices";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Categories = () => {
    let {page} = useParams();
    if(!page)
    {
        page = 1;
    }
    const {success} = useSelector(state => state.globalReducer);
    const dispatch = useDispatch();
    const {data = [], isFetching} = useGetQuery(page);
    const [removeCategory,response] = useDeleteCategoryMutation();
    console.log(response);
    const deleteCategory = id =>{
        if(window.confirm("Are you sure ?"))
        {
            removeCategory(id);
        }
    }
    useEffect(() =>{
        if(response.isSuccess)
        {
            dispatch(setSuccess(response?.data?.message))
        }
        // eslint-disable-next-line
    },[response?.data?.message])

    useEffect(()=>{
        dispatch(setSuccess(success));
        return () => {
            dispatch(clearMessage());
        }
        // eslint-disable-next-line
    },[])
    return(
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/create-category" className="btn-light text-black-1000">Add Categories<i className=" ml-2 fa-solid fa-plus"></i> </Link>
            </ScreenHeader>
            {success && <div className="alert-success">{success}</div>}
            {!isFetching ? data?.categories?.length > 0 && <><div>
                <table className="w-full bg-gray-900 rounded-md">
                    <thead>
                        <tr className="border-b border-gray-500/[0.7] text-left">
                            <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
                            <th className="p-3 uppercase text-sm font-medium text-gray-500">edit</th>
                            <th className="p-3 uppercase text-sm font-medium text-gray-500">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.categories?.map(category => (
                            <tr key = {category._id}>
                                <td className="p-3 capitalize text-sm text-gray-400 hover:text-gray-200">{category.name}</td>
                                <td className="p-3 capitalize text-sm text-gray-400 hover:text-gray-200"><Link to={`/dashboard/update-category/${category._id}`} className="btn-warning">edit</Link></td>
                                <td className="p-3 capitalize text-sm text-gray-400 hover:text-gray-200"><button className="btn-danger capitalize" onClick = {() => deleteCategory(category._id)}>delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                </div><Pagination path ="dashboard/categories/" page={parseInt(page)} perPage={data.perPage} count={data.count}/></> : <Spinner />}
        </Wrapper>
    )
}

export default Categories;