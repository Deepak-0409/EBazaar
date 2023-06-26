import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import Categories from "../../components/home/Categories";

const Home = () => {
    return(
        <>
            <Nav />
            <div className="">
                <Slider/>
            </div>
            <div className="my-container mt-10">
                <Categories></Categories>
            </div>
        </>
    )
}

export default Home;