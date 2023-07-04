import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { convert } from 'html-to-text';
import { motion } from "framer-motion";
import {BsCheckLg} from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';
import parser from "html-react-parser"; 
import currency from "currency-formatter";
import ProductImages from './ProductImages';
import Quantity from './Quantity';
import { addCart } from '../../store/reducers/cartReducer';
import { discountPrice } from '../../utils/DiscountPrice';

const ProductDetailCard = ({product}) => {
    const [quantity,setQuantity] = useState(1);
    const [sizeState,setSizeState] = useState(product?.sizes?.length>0 && product.sizes[0].name)
    const [colorState,setColorState] = useState(product?.colors?.length>0 && product.colors[0].color)
    let desc = convert(product.description);
    desc = parser(desc);
    const dispatch = useDispatch();

    const inc = () =>{
        setQuantity(quantity+1);
    }
    const dec = () =>{
        if(quantity>1)
        {
            setQuantity(quantity-1);
        }

    }
    const addToCart = () =>{
        const {['colors']:colors,['sizes']: sizes,['createdAt']:createdAt,['updateAt']:updatedAt,...newProduct} = product;
        newProduct['size']=sizeState;
        newProduct['color']=colorState;
        newProduct['quantity']=quantity;
        const cart = localStorage.getItem('cart');    
        const cartItems = cart ? JSON.parse(cart) : [];
        const checkItem = cartItems.find(item => item._id===newProduct._id);
        if(!checkItem){
            dispatch(addCart(newProduct)); 
            cartItems.push(newProduct);;
            localStorage.setItem('cart',JSON.stringify(cartItems));
        }
        else{
            toast.error(`${newProduct.title} is already waiting in your cart`);
            return;
        }
    }
    
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-wrap -mx-5">
            <Toaster/>
            <div className="w-full order-2 md:order-1 md:w-6/12 p-5">
                <div className="flex flex-wrap">
                    <ProductImages image={product.image1}/>
                    <ProductImages image={product.image2}/>
                    <ProductImages image={product.image3}/>
                </div>
            </div>
            <div className="w-full order-1 md:order-1 sm:w-6/12 p-5">
                <h1 className="text-4xl font-bold text-gray-900 capitalize">{product.title}</h1>
                <div className="flex flex-col my-3">
                    <span className="text-xl mr-4 font-bold text-black-950">{currency.format(discountPrice(product.price,product.discount),{code:"INR"})}</span>
                    <span className="text-lg text-gray-500 line-through">{currency.format(product.price,{code:"INR"})}</span>
                </div>
                {product.sizes.length > 0 &&( 
                    <>
                        <h3 className="text-lg font-medium capitalize text-gray-600 mb-3">sizes</h3>
                        <div className="flex flex-wrap -mx-1">
                            {product.sizes.map((size,index) =>(
                                <div className={`p-2 m-1 border border-gray-300 rounded min-w-[30px] text-center cursor-pointer ${sizeState===size.name && "bg-black-950"}`} key={index} onClick={ () => setSizeState(size.name)} >
                                    <span className={`text-sm font-semibold uppercase ${sizeState===size.name ? "text-white" : "text-gray-900"}`}>{size.name}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {product.colors.length>0 && (
                    <>
                        <h3 className="text-lg font-medium capitalize text-gray-600 mb-2 mt-3">Colors</h3>
                        <div className="flex flex-wrap -mx-1">
                            {product.colors.map((color) =>(
                                <div className="border border-gray-300 rounded m-1 p-1 cursor-pointer" key={color.id}  onClick={ () => setColorState(color.color)}>
                                    <span className="flex items-center justify-center min-w-[40px] min-h-[40px] rounded hover:scale-105 transition-all" style={{backgroundColor:color.color}}>{colorState===color.color && <BsCheckLg className="text-white text-2xl font-bold"/>}</span>
                                </div>
                            ))}
                        </div>

                    </>
                )}

                <div className="flex flex-col md:flex-row md:items-center -mx-3 my-10"> 
                    <div className="w-full sm:w-6/12 p-3">
                        <Quantity quantity={quantity} inc={inc} dec={dec}/>
                    </div>
                    <div className="w-full sm:w-6/12 p-3 md:-mx-18 lg:-mx-20 xl:-mx-28">
                        <button className="btn-primary" onClick={addToCart}>Add to cart</button>
                    </div>
                </div>

                <h3 className="text-lg font-medium capitalize text-gray-600 mb-2 mt-3">Description</h3>
                <div className="mt-4 leading-7 product-desc">{desc}</div>
            </div>
        </motion.div>
    )
}

export default ProductDetailCard