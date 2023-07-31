import { Link } from "react-router-dom"
import currency from "currency-formatter";
import { motion } from "framer-motion";

const ProductCard = ({product}) => {
    const percentage = product.discount/100;
    const discountPrice = product.price-product.price*percentage;

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} key={product._id} className={`w-full sm:w-[calc(50%-6px)] md:w-[calc(33.333333%-6px)] lg:w-[calc(25%-6px)] xl:w-[calc(20%-6px)] px-5 py-5 mr-[6px] mt-5 border-[2px] rounded-md border-neutral-200/40 hover:scale-105 hover:shadow-md hover:transition-all duration-200`} >
        <Link to={`/product/${product._id}`}> 
            <div className="w-full">
                <img src={`/images/${product.image1}`} alt="product image" className="w-full h-[300px] object-cover rounded-lg"/>  
            </div>
            <p className="capitalize text-base font-medium text-black-1000 my-2.5">{product.title}</p>
            <div className="flex flex-col">
                <span className="text-base font-medium ">{currency.format(discountPrice,{code:"INR"})}</span>
                <span className="text-base font-medium text-gray-400 line-through">{currency.format(product.price,{code:"INR"})}</span>
            </div>
        </Link>
    </motion.div>
  )
}

export default ProductCard;