import { useState,useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {TwitterPicker} from "react-color";
import {convert} from "html-to-text"
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useAllCategoriesQuery } from "../../store/services/categoryServices";
import { useGetProductQuery, useUpdateProductMutation} from "../../store/services/productService";
import Spinner from "../../components/Spinner";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import Colors from "./Colors";
import SizesList from "../../components/SizesList";
import { setSuccess } from "../../store/reducers/globalReducer";

const EditProduct = () => {
    const {id} = useParams();
    const {data:product,isFetching: fetching} = useGetProductQuery(id);
    const { data = [], isFetching } = useAllCategoriesQuery();
    const [value, setValue] = useState("");
    const [state,setState] = useState({
        title: '',
        price: 0,
        discount: 0,
        stock: 0,
        category: '',
        colors: [],
    });
    
    const [sizes] = useState([
        {name:'xsm'},
        {name:'sm'},
        {name:'md'},
        {name:'l'},
        {name:'xl'},
        {name:'1 year'},
        {name:'2 years'},
        {name:'3 years'},
        {name:'4 years'},
        {name:'5 years'},
    ])

    const [sizeList,setSizeList] = useState([]);
    
    const handleInput = e => {
        setState({...state,[e.target.name]:e.target.value})
    }

    const saveColors = (color) =>{
        const filtered = state.colors.filter((clr) => clr!==color.hex);
        setState({...state,colors:[...filtered,{color:color.hex, id: uuidv4()}]})
    }
    
    const deleteColor = (color) =>{
        const filtered = state.colors.filter(clr => clr.id !== color.id);
        setState({...state,colors:filtered});
    }
    
    const chooseSize = sizeObject => {
        const filtered = sizeList.filter(size => size.name !== sizeObject.name);
        setSizeList([...filtered, sizeObject])
    }
    
    const deleteSize = (name) =>{
        const filtered = sizeList.filter(size => size.name !== name);
        setSizeList(filtered);
    }

    const [updateProduct,response] = useUpdateProductMutation();
    useEffect(() => {
        if(!response.isSuccess) {
            response?.error?.data?.errors.map(err => {
                return toast.error(err.msg) 
            })
        }
        // eslint-disable-next-line
    },[response?.error?.data?.errors])

    const dispatch = useDispatch();
    const navigate= useNavigate();

    useEffect(() => {
        if(response?.isSuccess)
        {
            dispatch(setSuccess(response?.data?.message ))
            navigate("/dashboard/products");
        }
        // eslint-disable-next-line
    }, [response?.isSuccess])
    
    const createProduct = e =>{
        const desc=convert(value);
        e.preventDefault();
        setState({...state,description:desc});
        updateProduct(state);
    }
    useEffect(()=> {
        setState({...state,description: value})
        // eslint-disable-next-line
    },[value])
    
    useEffect(() => {
        if(!fetching){
            setState(product);
            setValue(convert(product.description));
            setSizeList(product.sizes);
        }
        // eslint-disable-next-line
    },[product])
    

    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/products" className="btn-light text-black-1000"><i className="fa-solid fa-arrow-left mr-2"></i> Products List</Link>
            </ScreenHeader>
            <Toaster position="top-right" reverseOrder={true} />
            <div className="flex flex-wrap -mx-3 items-baseline">
                <form className="w-full xl:w-8/12 p-3" onSubmit={createProduct}>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="title" className="label">Title</label>
                            <input type="text" name="title" className="form-control" id="title" placeholder="title..." onChange={handleInput} value={state.title}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="price" className="label">Price</label>
                            <input type="number" name="price" className="form-control" id="price" placeholder="price..." onChange={handleInput} value={state.price}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="discount" className="label normal-case">Discount(in %)</label>
                            <input type="number" name="discount" className="form-control" id="discount" placeholder="discount..." onChange={handleInput} value={state.discount}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="stock" className="label">Stock</label>
                            <input type="number" name="stock" className="form-control" id="stock" placeholder="stock..." onChange={handleInput} value={state.stock}/>
                        </div>
                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="category" className="label">Categories</label>
                            {!isFetching ? data?.categories?.length > 0 && 
                                <select name="category" id="category" className="form-control" onChange={handleInput} value={state.category}>
                                    <option value="">Choose category</option>
                                    {data?.categories?.map(category => (
                                        <option value={category.name} key={category._id}>{category.name}</option>
                                    ))}
                                </select> 
                            : <Spinner />}
                        </div>

                        <div className="w-full md:w-6/12 p-3">
                            <label htmlFor="colors" className="label">Choose colors</label>
                            <TwitterPicker onChangeComplete = {saveColors}/>
                        </div>
                        <div className="w-full  p-3">
                            <label htmlFor="sizes" className="label">Choose Size</label>
                            {sizes.length > 0 && 
                            <div className="flex flex-wrap -mx-2">
                                {sizes.map(size => (
                                    <div key={size.name} className="size" onClick={() => chooseSize(size)}>{size.name}</div>
                                ))}
                            </div>}
                        </div>
                        <div className="w-full p-3">
                            <label htmlFor="description" className="label">Description</label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="Description..."/>
                        </div>

                        <div className="w-full p-3">
                            <input type="submit" value={response.isLoading ? 'loading...' : 'Update'} disabled = {response.isLoading ? true : false} className="btn-indigo"/>
                        </div>
                    </div>
                </form>
                <div className="w-full xl:w-4/12 p-3">
                    <Colors colors = {state.colors} deleteColor = {deleteColor}></Colors>
                    <SizesList list={sizeList} deleteSize = {deleteSize}></SizesList>
                </div>
            </div>
        </Wrapper>
    )
}

export default EditProduct;