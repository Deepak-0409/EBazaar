import { useState,useEffect } from "react";
import { useAuthLoginMutation } from "../../store/services/authService";
import { setAdminToken } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const handleInputs = e => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const [login,response] = useAuthLoginMutation();
    console.log("My response: ", response);
    const errors = response?.error?.data?.errors ? response?.error?.data?.errors : []; 

    const adminLoginFunction = e =>{
        e.preventDefault();
        login(state);
    }

    const dispatch = useDispatch();

    useEffect(() => {
       if(response.isSuccess)
       {
        localStorage.setItem('admin-token',response?.data?.token);
        dispatch(setAdminToken(response?.data?.token));
        navigate("/dashboard/products");
       } 
       // eslint-disable-next-line
    }, [response.isSuccess])

    return(
        <div className="bg-black-1000 h-screen flex justify-center items-center">

            <form onSubmit={adminLoginFunction} className="bg-black-950 p-3 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 text-center rounded-md">
            
                <h3 className="text-white mb-5 font-semibold text-2xl">Dashboard Login</h3>
                
                {errors.length>0 && errors.map((error,key) => (
                    <div key={key}>
                        <p className="alert-msg">{error.msg}</p>
                    </div>
                ))}
                
                <div className="mb-5 mt-3">
                    <input className="w-full outline-none rounded p-4 " type="email" name="email" placeholder="Enter email" onChange={handleInputs} value={state.email}/>
                </div>
                <div className="mb-5">
                    <input className="w-full outline-none rounded p-4 " type="password" name="password" placeholder="Enter the password" onChange={handleInputs} value={state.password}/>
                </div>
                <div className="mb-3">
                    <input  type="submit" className="p-4 bg-indigo-600 text-white w-3/5 rounded-lg font-semibold text-lg cursor-pointer hover:bg-indigo-700" value={response.isLoading ? "Loading..." : "Sign In"} />
                </div>
            </form>
        </div>
    )
}

export default AdminLogin;