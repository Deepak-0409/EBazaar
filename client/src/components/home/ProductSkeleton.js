import Skeleton from "./skeleton/Skeleton"
import Thumbnail from "./skeleton/Thumbnail"
import Text from "./skeleton/Text"

const ProductSkeleton = () => {
  return (
    <div className="flex flex-wrap">
        {[1,2,3,4,5].map(item => (
            <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-1/5 p-4" key={item}>
                <Skeleton> 
                    <Thumbnail height="280px"/>
                    <Text mt="10px"/>
                    <Text mt="10px"/>
                </Skeleton>
            </div>
        ))}
    </div>
  )
}

export default ProductSkeleton