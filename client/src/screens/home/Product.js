import { Link,useParams } from "react-router-dom";
import {GoChevronRight} from "react-icons/go"
import Nav from "../../components/home/Nav"
import { useGetProductQuery } from "../../store/services/productService";
import ProductDetailCard from "../../components/home/ProductDetailCard";

const Product = () => {
  const {id} = useParams();
  const {data,isFetching} = useGetProductQuery(id);
  return <>
        <Nav/>
        <div className="my-container mt-24">
          {isFetching ? 'loading' :(
          <>
            <ul className="flex items-center ">
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