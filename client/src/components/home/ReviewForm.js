import { useEffect, useState } from "react";
import {BsStar,BsStarFill} from "react-icons/bs"
import {IoClose} from "react-icons/io5"
import {motion} from "framer-motion"
import { usePostReviewMutation } from "../../store/services/userOrderService";

const ReviewForm = ({value, viewState=false, toggleView, data, setToast}) => {

    const [rating, setRating] = useState(value);
    const [hover, setHover] = useState(0);
    const [state, setState] = useState({
        userRating: 0,
        comment: ""
    });
    const [submitReview,response] = usePostReviewMutation();
    useEffect(() => { 
        if(response.isSuccess){
            closeForm();
            setToast(response?.data?.message)
        }
        // eslint-disable-next-line
    }, [response.isSuccess] );

    useEffect(() => { 
        setRating(value);
        setHover(0);
        setState({...state, userRating: value});
        // eslint-disable-next-line
    }, [value] );
    
    const handleInput = e => {
        setState({...state,[e.target.name]:e.target.value})
    }
    const handleClick = (index) => {
        setRating(index);
        setState({...state, userRating: index});
    }
    const handleMouseEnter = (index) => {
        setHover(index);
    }
    const handleMouseLeave = (rating) => {
        setHover(rating);
    } 
    const closeForm = () => {
        setRating(0);
        setState({...state, userRating: 0, comment: ""});
        toggleView();
    }
    const postReview = e => {
        e.preventDefault();
        submitReview({...state, user: data?.order?.userId?._id, product: data?.order?.productId?._id, order: data?.order?._id});
    }
    

    return viewState ? 
        <>            
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 w-full h-full bg-black-1000/40 z-[100] flex items-center justify-center">
                    <div className="w-[90%] sm:w-8/12 md:6/12 lg:w-4/12">
                        <div className="bg-white p-5 rounded-lg">
                            <div className="-mx-5 -mt-5 p-5 flex items-center justify-center rounded-t-lg bg-[#2035F2]">
                                <h1 className="text-xl flex-1 text-center font-medium text-neutral-50 tracking-wider">Feedback</h1>
                                <span className="cursor-pointer" onClick={closeForm}><IoClose size={26} className="text-white font-bold"/></span>
                            </div>
                            {response.isError && response?.error?.data?.errors.map((err,idx) =>(
                                <p key={idx} className="alert-msg">{err.msg}</p>
                            ))}
                            <form onSubmit={postReview}>
                                <div className="text-center mt-3">
                                    <p className="font-medium text-[#0c1327]">Your feedback help us to improve</p>
                                    <p className="font-medium text-gray-500/70">Please let us know about your shopping experience</p>
                                </div>
                                <div className="flex items-center justify-around my-8">
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                onClick={() => handleClick(index)}
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={() => handleMouseLeave(rating)}
                                            >
                                            <span>{index <= ( (rating && hover) || (rating || hover)) ? <BsStarFill size={40} className="text-[#ffdf00]"/> : <BsStar size={40} className="text-[#1981f0]"/>}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="comment" className="font-semibold text-base text-[#0c1327] mb-2">Add Comments:</label>
                                    <textarea name="comment" id="comment" cols="20" className="review-textarea" placeholder="Write a review..." style={{resize:"none"}} onChange={handleInput} value={state.comment}></textarea>
                                </div>
                                <div className="mt-5 mb-3 text-center">
                                    <input type="submit" value="Submit" className="btn-indigo text-neutral-50 cursor-pointer rounded-md w-full md:w-3/5 lg:w-2/5"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
        </>
        : '';
}

export default ReviewForm