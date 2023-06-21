import { Link, useNavigate } from "react-router-dom";
import {motion} from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserRegisterMutation  } from "../../../store/services/authService";
import { setUserToken } from "../../../store/reducers/authReducer";
import { setSuccess } from "../../../store/reducers/globalReducer";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";

const Register = () =>{
    const [errors, setErrors] = useState([]);

    const [state,setState] = useState({
        name:"",
        email:"",
        password:""
    });
     
    const [registerUser,response]= useUserRegisterMutation();
    console.log("response: ",response);

    const onChange = e =>{
        setState({...state,[e.target.name]:e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        registerUser(state);
    }
    
    useEffect(() =>{
        if(response.isError)
        {
            setErrors(response?.error?.data?.errors);
        }
    },[response?.error?.data])

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    useEffect(() =>{
        if(response.isSuccess)
        {
            localStorage.setItem('user-token',response?.data?.token);
            dispatch(setUserToken(response?.data?.token));
            dispatch(setSuccess(response?.data?.msg));
            navigate("/user");
        }
    },[response.isSuccess])

    
    const showError = name =>{
        const exist = errors.find(err => err.param ===name);

        if(exist){
            return exist.msg;
        }
        else  
        {
            return false;
        }
    }
    return(
        <>
        <Nav />
        <div className="pb-20">
            <Header>
                Sign Up
            </Header>
            <div className="flex flex-wrap justify-center">
                <motion.div initial={{opacity:0,x:"-100vw"}} animate={{opacity:1,x:0}} className="w-full sm:w-8/12 md:6/12 lg:w-4/12 p-6">
                    <form onSubmit={onSubmit} className="bg-white rounded-lg -mt-16 border border-gray-200 p-10">
                        <h1 className="heading mb-5 text-center ">Sign Up</h1>
                        <div className="mb-4">
                            <label htmlFor="name" className="label text-gray-700">username</label>
                            <input type="text" name="name" id="name" className={`form-input ${showError('name') ? 'border-rose-600' : 'border-gray-300'}`} value={state.name} placeholder="Enter Username" onChange={onChange}/>
                            {showError('name') && <span className="error">{showError('name')}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="label text-gray-700">email</label>
                            <input type="email" name="email" id="email" className={`form-input ${showError('name') ? 'border-rose-600' : 'border-gray-300'}`} value={state.email} placeholder="abcd@gmail.com" onChange={onChange}/>
                            {showError('email') && <span className="error">{showError('email')}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="label text-gray-700">password</label>
                            <input type="password" name="password" id="password" className={`form-input ${showError('name') ? 'border-rose-600' : 'border-gray-300'}`} value={state.password} placeholder="Enter Password" onChange={onChange}/>
                            {showError('password') && <span className="error">{showError('password')}</span>}
                        </div>
                        <div className="mt-10 mb-4 text-center">
                            <input type="submit" value={`${response.isLoading ? 'Loading...' : 'SignUp'}`} className="btn-indigo w-full md:w-3/5 lg:w-2/5 " disabled={response.isLoading ? true : false}/>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Already have an account ? <span className="capitalize font-medium text-base text-blue-700"><Link to="/login ">LogIn</Link></span></p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
        </>
    )
}

export default Register;    