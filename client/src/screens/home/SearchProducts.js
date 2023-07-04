import { useParams } from "react-router-dom"
import { useSearchProductsQuery } from "../../store/services/homeProducts";
import Header from "../../components/home/Header"
import Nav from "../../components/home/Nav"
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/home/ProductSkeleton";

const SearchProducts = () => {
    const {keyword,page=1}= useParams();
    const {data,isFetching} = useSearchProductsQuery({keyword,page:parseInt(page)});
    return <>
            <Nav/>
            <div className="mt-20">
                <Header>{keyword}</Header>
            </div>
            <div className="my-container my-10">
                {isFetching ? (
                    <ProductSkeleton/>
                ): data.count>0 ? (<>
                <p className="text-base font-medium text-gray-700">{data.count} products found for #{keyword} keyword</p>
                <div className="flex flex-wrap -mx-5">
                    {data.products.map(product => {

                        return (
                            <ProductCard product={product} key={product._id}/>
                        )
                    })}
                </div>
                <Pagination path ={`category-products/${keyword}/`} page={parseInt(page)} perPage={data.perPage} count={data.count} theme="light"/> 
                </>) : <p className="alert-msg">No product available at this moment</p>}
            </div>
    </>
}


export default SearchProducts