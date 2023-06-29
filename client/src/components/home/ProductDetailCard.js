import currency from "currency-formatter";

const ProductDetailCard = ({product}) => {
    console.log(product);
    const percentage = product.discount/100;
    const discountPrice = product.price-product.price*percentage;
    return (
        <div className="flex flex-wrap -mx-5">
            <div className="w-full sm:w-6/12 p-5">
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-6/12 p-1">
                        <img src={`/images/${product.image1}`} alt="image1.jpg" className="w-full h-auto object-cover" />
                    </div>
                    <div className="w-full sm:w-6/12 p-1">
                        <img src={`/images/${product.image2}`} alt="image2.jpg" className="w-full h-auto object-cover" />
                    </div>
                    <div className="w-full sm:w-6/12 p-1">
                        <img src={`/images/${product.image3}`} alt="image3.jpg" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-6/12 p-5">
                <h1 className="text-4xl font-bold text-gray-900 capitalize">{product.title}</h1>
                <div className="flex flex-col my-3">
                    <span className="text-xl mr-4 font-bold text-black-950">{currency.format(discountPrice,{code:"INR"})}</span>
                    <span className="text-lg text-gray-500 line-through">{currency.format(product.price,{code:"INR"})}</span>
                </div>
                {product.sizes.length > 0 &&( 
                    <>
                        <h3 className="text-lg font-medium capitalize text-gray-600 mb-3">sizes</h3>
                        <div className="flex flex-wrap -mx-1">
                            {product.sizes.map((size,index) =>(
                                <div className="p-2 m-1 border border-gray-300 rounded min-w-[30px] text-center cursor-pointer" key={index}>
                                    <span className="text-sm font-semibold uppercase text-gray-900">{size.name}</span>
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
                                <div className="border border-gray-300 rounded m-1 p-1 cursor-pointer" key={color.id}>
                                    <span className="block min-w-[40px] min-h-[40px] rounded hover:scale-105 transition-all" style={{backgroundColor:color.color}}></span>
                                </div>
                            ))}
                        </div>

                    </>
                )}

                <h3 className="text-lg font-medium capitalize text-gray-600 mb-2 mt-3">Description</h3>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

export default ProductDetailCard