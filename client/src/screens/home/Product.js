import { Link,useNavigate,useParams } from "react-router-dom";
import {GoChevronRight} from "react-icons/go"
import { BiArrowBack } from "react-icons/bi";
import Nav from "../../components/home/Nav"
import { useGetProductQuery } from "../../store/services/productService";
import ProductDetailCard from "../../components/home/ProductDetailCard";
import ProductLoader from "../../components/home/ProductLoader";

const Product = () => {
  const {id} = useParams();
  const {data,isFetching} = useGetProductQuery(id);
  const navigate = useNavigate();
  return <>
        <Nav/>
        <div className="my-container mt-24">
          {isFetching ? (
            <ProductLoader/>
          ) :(
          <>

            <ul className="flex items-center py-3">
              <li className="mr-3">
                <span onClick={() => navigate(-1)} className="cursor-pointer"><BiArrowBack size={26} className="text-black-1000" /></span>
              </li>            
              <li className="capitalize text-gray-500">
                <Link to="/">Home</Link>
              </li>
              <GoChevronRight className="block mx-2 text-gray-500"/>
              <li className="capitalize text-gray-500">
                <Link to={`/category-products/${data.category}`}>{data.category}</Link>
              </li>
              <GoChevronRight className="block mx-2 text-gray-500"/>
              <li className="capitalize text-gray-500">
                <Link to={`/product/${data._id}`}>{data.title}</Link>
              </li>
            </ul>
            <ProductDetailCard product={data}/>
          </>
          )}
        </div>
  </>
}

export default Product;