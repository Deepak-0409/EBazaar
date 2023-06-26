import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {motion} from "framer-motion"
import { useState,useEffect } from "react";
import { useUserLoginMutation } from "../../../store/services/authService";
import { setUserToken } from "../../../store/reducers/authReducer";
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/ShowError";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";

const Login = () =>{
    const [errors, setErrors] = useState([]);
    const {state,onChange} = useForm({
        email:'',
        password:''
    });

    const [loginUser, response] = useUserLoginMutation();
    
    const onSubmit = e =>{
        e.preventDefault();
        loginUser(state);
    }

    useEffect(() =>{
        if(response.isError)
        {
            setErrors(response?.error?.data?.errors);
        }
        // eslint-disable-next-line
    },[response?.error?.data])

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    useEffect(() =>{
        if(response.isSuccess)
        {
            localStorage.setItem('user-token',response?.data?.token);
            dispatch(setUserToken(response?.data?.token)); 
            navigate("/user");
        }
        // eslint-disable-next-line
    },[response.isSuccess])

    

    return(
        <>
        <Nav />
        <div className="pb-20">
            <Header>
                Login
            </Header>
            <div className="flex flex-wrap justify-center">
                <motion.div initial={{opacity:0,x:"-100vw"}} animate={{opacity:1,x:0}} className="w-full sm:w-8/12 md:6/12 lg:w-4/12 p-6">
                    <form onSubmit={onSubmit} className="bg-white rounded-lg -mt-16 border border-gray-200 p-10">
                        <h1 className="heading mb-5 text-center ">Login</h1>
                        <div className="mb-4">
                            <label htmlFor="email" className="label text-gray-700">email</label>
                            <input type="email" name="email" id="email" value={state.email} className={`form-input ${showError(errors,'email') ? 'border-rose-600' : 'border-gray-300'}`} placeholder="abcd@gmail.com" onChange={onChange}/>
                            {showError(errors,'email') && <span className="error">{showError(errors,'email')}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="label text-gray-700">password</label>
                            <input type="password" name="password" id="password" value={state.password} className={`form-input ${showError(errors,'password') ? 'border-rose-600' : 'border-gray-300'}`} placeholder="Enter Password" onChange={onChange}/>
                            {showError(errors,'password') && <span className="error">{showError(errors,'password')}</span>}
                        </div>
                        <div className="mt-10 mb-4 text-center">
                            <input type="submit" value={`${response.isLoading ? 'Loading...' : 'Log In'}`} className="btn-indigo w-full md:w-3/5 lg:w-2/5 " disabled={response.isLoading ? true : false}/>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Don't have an account ? <span className="capitalize font-medium text-base text-blue-700"><Link to="/register">Register</Link></span></p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
        </>
    )
}

export default Login;    