import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import Account from "../../components/home/Account";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyPaymentQuery } from "../../store/services/paymentService";
import { useEffect } from "react";
import { emptyCart } from "../../store/reducers/cartReducer";

const Dashboard = () => {
  const {user} = useSelector(state => state.authReducer );
  const [params] = useSearchParams();
  const id = params.get("session_id")
  const {data,isSuccess} = useVerifyPaymentQuery(id,{skip: id ? false : true}); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    if(isSuccess){
      toast.success(data.message)
      dispatch(emptyCart());
      navigate("/user");
    }
  },[isSuccess])

  return (
    <>
      <Nav />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="">
        <Header>
          My Account 
        </Header>
        <div className="my-container mt-20 pb-32">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <Account />
            </div>
            <div className="w-full md:w-8/12 p-6">
              <h1 className="heading">name</h1>
              <span className="block mt-3 capitalize font-medium text-sm">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;