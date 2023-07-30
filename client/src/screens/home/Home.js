import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import Categories from "../../components/home/Categories";
import { useRandomCategoriesQuery } from "../../store/services/categoryServices";
import HomeProduct from "../../components/home/HomeProduct";
import Footer from "../../components/home/Footer";

const Home = () => {
    const {data,isFetching} = useRandomCategoriesQuery();

    return(
        <>
            <Nav />
            <div className="">
                <Slider/>
            </div>
            <div className="my-container mt-10">
                <Categories/>
                {!isFetching && data?.categories?.length > 0 && data?.categories.map(category =>(
                    <HomeProduct category={category} key={category._id}/>
                ))}
            </div>
            <Footer/>
        </>
    )
}

export default Home;