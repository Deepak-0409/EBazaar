import { Link, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react"
import { useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useCreateMutation } from "../../store/services/categoryServices";
import { setSuccess } from "../../store/reducers/globalReducer";

const CreateCategory = () => {
    const [state, setState] = useState("");
    const [saveCategory,response] = useCreateMutation();
    const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];
    const submitCategory = e =>{
        e.preventDefault();
        saveCategory({name: state});
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
            <form className="w-full md:w-7/12" onSubmit={submitCategory}>
                <h3 className="text-lg mb-3">Create Category</h3>
                {errors.length>0 && errors.map((error,key) => (
                    <div key={key}>
                        <p className="alert-msg">{error.msg}</p>
                    </div>
                ))}
                <div className="mb-3">
                    <input type="text" name="" className="form-control" placeholder="Category Name" value={state} onChange={(event) => setState(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn-indigo">Create Category</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default CreateCategory;