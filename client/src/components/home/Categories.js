import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useAllCategoriesQuery } from "../../store/services/categoryServices"
import Skeleton from './skeleton/Skeleton';
import Thumbnail from './skeleton/Thumbnail';

const Categories = () => {
    const {data, isFetching} = useAllCategoriesQuery();
    let i=1;

    return isFetching ? <div className="flex flex-wrap">
        {[1,2,3,4].map(item => (
            <div className="w-6/12 sm:w-4/12 md:w-3/12 p-4" key={item}>
                <Skeleton> 
                    <Thumbnail/>
                </Skeleton>
            </div>
        ))}
    </div>: data?.categories.length > 0 &&  <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={3} virtual className="category-swiper" breakpoints={{
        0:{
            slidesPerView:2,
        },
        640:{
            slidesPerView: 3,
        },
        768:{
            slidesPerView:4,  
        },
    }}>
        {data?.categories.map((category,index) =>{

            if(i>=3)
            {
                i=1;
            }
            else{
                i++;
            }

            return(
                <SwiperSlide key={category._id} virtualIndex={index} className='category-slider'>
                        <div className="w-full h-full rounded-lg overflow-hidden">
                            <img src={`/images/slider${i}.jpg`} alt="" className="w-full h-full object-cover"/>
                        </div>
                        <div className="absolute inset-0 w-full h-full bg-black-1000/50 flex items-center justify-center p-4">
                            <Link to="/" className="text-white text-base font-medium capitalize">{category.name}</Link>
                        </div>
                </SwiperSlide>
        )})}
    </Swiper>
    
    
    
}

export default Categories