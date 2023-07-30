import { useParams } from "react-router-dom"
import { useCategoryProductsQuery } from "../../store/services/homeProducts";
import Header from "../../components/home/Header"
import Nav from "../../components/home/Nav"
import ProductCard from "../../components/home/ProductCard";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/home/ProductSkeleton";
import Footer from "../../components/home/Footer";

const CategoryProducts = () => {
    const { name, page = 1 } = useParams();
    const { data, isFetching } = useCategoryProductsQuery({ name, page: parseInt(page) });
    return <>
        <Nav />
        <div className="mt-20">
            <Header>{name}</Header>
        </div>
        <div className="my-container my-10">
            {isFetching ? (
                <ProductSkeleton />
            ) : data.count > 0 ? (<>
                <p className="text-base font-medium text-gray-700">{data.count} products found in #{name} category</p>
                <div className="flex flex-wrap -mx-5">
                    {data.products.map(product => {

                        return (
                            <ProductCard product={product} key={product._id} />
                        )
                    })}
                </div>
                <Pagination path={`category-products/${name}/`} page={parseInt(page)} perPage={data.perPage} count={data.count} theme="light" />
            </>) : <p className="alert-msg">No product available at this moment</p>}
        </div>
        <Footer />
    </>
}


export default CategoryProducts