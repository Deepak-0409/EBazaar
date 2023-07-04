import {BiMinus,BiPlus} from "react-icons/bi"

const Quantity = ({quantity,inc,dec}) => {
  return (
    <div className="flex items-center -mx-3">
        <span className="flex border border-gray-300 m-3 p-2 rounded-full bg-white text-black-950 cursor-pointer hover:bg-black-950 transition-all hover:text-white" onClick={dec}><BiMinus className="text-xl"/></span>
        <span className="flex items-center justify-center w-14 h-12 border border-gray-300 rounded-lg">
          {quantity}
        </span>
        <span className="flex border m-3 p-2 rounded-full bg-black-950 text-white cursor-pointer hover:bg-[#2C323E] transition-all" onClick={inc}><BiPlus className="text-xl"/></span>
    </div>
  )
}

export default Quantity