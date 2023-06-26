import { useRandomCategoriesQuery } from "../../store/services/categoryServices";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

const Slider = () => {
  const {data,isFetching} = useRandomCategoriesQuery();
  console.log(data)
  console.log(data?.categories.length);
  const categories=data?.categories;  
  
  return isFetching ? ( 
    <div className="my-container flex items-center justify-center">
        <Spinner/>
    </div>
  ) : <Swiper pagination={{ dynamicBullets: true,}} modules={[Pagination]} className="mySwiper mt-20"> 
    {categories.length>0 && categories.map((cat,index)=>(
      <SwiperSlide className="slide" key={cat._id}>
          <div className="slide-img">
            <img src={`/images/slider${index+1}.jpg`} alt="" />
          </div>
          <div className="absolute inset-0 w-full h-full bg-black-1000/50">
            <div className="my-container h-[70vh] flex flex-col items-center justify-center">
              <h1 className="text-white text-xl font-medium capitalize">{cat.name}</h1>
              <div className="mt-10">
                <Link to="/" className="btn-indigo text-sm">Browse Collections</Link>
              </div>
            </div>
          </div>
      </SwiperSlide>
    ))}

  </Swiper>
}

export default Slider