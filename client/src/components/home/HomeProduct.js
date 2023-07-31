import { Link } from "react-router-dom";
import { useCategoryProductsQuery } from "../../store/services/homeProducts"
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";

const HomeProduct = ({category}) => {
  const {data,isFetching} = useCategoryProductsQuery({name:category.name,page:""});
  return isFetching ? <ProductSkeleton/> : data?.products.length > 0 &&(
    <div className="mb-16">
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-lg font-medium capitalize">{category.name}</span>
        <span className="capitalize"> <Link to={`/category-products/${category.name}`}>see all</Link></span>
      </div>
      <div className="flex flex-wrap -mx-5">
        {data?.products.map(item =>(
          <ProductCard product={item} key={item._id } />
        ))}
      </div>
    </div>
  )
}

export default HomeProduct