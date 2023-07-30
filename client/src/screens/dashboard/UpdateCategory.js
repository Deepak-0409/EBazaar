import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react"
import { useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { setSuccess } from "../../store/reducers/globalReducer";
import { useFetchCategoryQuery, useUpdateCategoryMutation } from "../../store/services/categoryServices";
import Spinner from "../../components/Spinner";

const UpdateCategory = () => {
    const [state, setState] = useState("");
    const {id} = useParams();
    const {data,isFetching} = useFetchCategoryQuery(id);
    
    useEffect(() => {
        data?.category && setState(data?.category?.name)
        // eslint-disable-next-line
    }, [data?.category])

    const [saveCategory,response] = useUpdateCategoryMutation();
    const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];
    const updateSubmit = e =>{
        e.preventDefault();
        saveCategory({name: state, id});
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(response?.isSuccess)
        {
            dispatch(setSuccess(response?.data?.message))
            navigate("/dashboard/categories");
        }
        // eslint-disable-next-line
    }, [response?.isSuccess])

    return(
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/categories" className="btn-light text-black-1000"><i className="fa-solid fa-arrow-left mr-2"></i> Categories List</Link>
            </ScreenHeader>

            {!isFetching ? <form className="w-full md:w-7/12" onSubmit={updateSubmit}>
                <h3 className="text-lg mb-3">Update Category</h3>
                {errors.length>0 && errors.map((error,key) => (
                    <div key={key}>
                        <p className="alert-msg">{error.msg}</p>
                    </div>
                ))}
                <div className="mb-3">
                    <input type="text" name="" className="form-control" placeholder="Category Name" value={state} onChange={(event) => setState(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn-indigo">Update</button>
                </div>
            </form> : <Spinner/>}

        </Wrapper>
    )
}

export default UpdateCategory;