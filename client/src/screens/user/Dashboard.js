import { useSelector } from "react-redux";
import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import Account from "../../components/home/Account";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const {user} = useSelector(state => state.authReducer );
  const [params] = useSearchParams();
  console.log(params.get('session_id'));
  return (
    <>
      <Nav />
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