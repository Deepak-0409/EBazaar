import { useEffect } from "react";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import Categories from "../../components/home/Categories";
import { useRandomCategoriesQuery } from "../../store/services/categoryServices";
import HomeProduct from "../../components/home/HomeProduct";
import Footer from "../../components/home/Footer";

const Home = () => {
    const { data, isFetching } = useRandomCategoriesQuery();
    //To scroll to top when component loads
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Nav />
            <div className="">
                <Slider />
            </div>
            <div className="my-container mt-10 mb-24">
                <div className="mb-3">
                    <span className="text-base text-[#0C1327] font-medium">Swipe left to view more categories</span>
                </div>
                <Categories />
                {!isFetching && data?.categories?.length > 0 && data?.categories.map(category => (
                    <HomeProduct category={category} key={category._id} />
                ))}
            </div>
            <Footer />
        </>
    )
}

export default Home;