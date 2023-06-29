import { useParams } from "react-router-dom"
import { useCategoryProductsQuery } from "../../store/services/homeProducts";
import Header from "../../components/home/Header"
import Nav from "../../components/home/Nav"
import Skeleton from "../../components/home/skeleton/Skeleton";
import Thumbnail from "../../components/home/skeleton/Thumbnail";
import Text from "../../components/home/skeleton/Text";
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";

const CategoryProducts = () => {
    const {name,page=1}= useParams();
    const {data,isFetching} = useCategoryProductsQuery({name,page});
    return <>
            <Nav/>
            <div className="mt-20">
                <Header>{name}</Header>
            </div>
            <div className="my-container my-10">
                {isFetching ? (<div className="flex flex-wrap">
                    {[1,2,3,4].map(item => (
                        <div className="w-6/12 sm:w-4/12 md:w-3/12 p-4" key={item}>
                            <Skeleton> 
                                <Thumbnail height="280px"/>
                                <Text mt="3"/>
                                <Text mt="3"/>
                            </Skeleton>
                        </div>
                    ))}
                </div>): data.count>0 ? (<>
                <p className="text-base font-medium text-gray-700">{data.count} products found in #{name} category</p>
                <div className="flex flex-wrap -mx-5">
                    {data.products.map(product => {

                        return (
                            <ProductCard product={product}/>
                        )
                    })}
                </div>
                <Pagination path ={`category-products/${name}/`} page={parseInt(page)} perPage={data.perPage} count={data.count} theme="light"/> 
                </>) : <p className="alert-msg">No product available at this moment</p>}
            </div>
    </>
}


export default CategoryProducts