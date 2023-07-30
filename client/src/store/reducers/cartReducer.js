import { createSlice } from "@reduxjs/toolkit";
import { discountPrice } from "../../utils/DiscountPrice";

const cartData = localStorage.getItem("cart")
const cartArray = cartData ? JSON.parse(cartData) : [];
function allItems(data){
    let items=0;
    for(let i=0;i<data.length;i++){
      items += data[i].quantity;  
    }
    return items;
}

function calculateTotal(data){
    let total=0;

    for(let i=0;i<data.length;i++){
        total += discountPrice(data[i].price,data[i].discount)*data[i].quantity;
    }
    return total;
}
const cartReducer = createSlice({
    name: "cart",
    initialState: {
        cart: cartArray.length>0 ? cartArray : [],
        items: cartArray.length>0 ? allItems(cartArray) : 0,
        total: cartArray.length>0 ? calculateTotal(cartArray) : 0,
    },
    reducers: {
        addCart: (state,{payload}) =>{
            state.cart.push(payload);
            state.items += payload.quantity;
            state.total += discountPrice(payload.price,payload.discount)*payload.quantity;
        },
        incQuantity: (state,{payload}) =>{
            const item = state.cart.find(item => item._id === payload);
            if(item){
                item.quantity += 1;
                state.items += 1;
                state.total += discountPrice(item.price,item.discount);
                localStorage.setItem("cart",JSON.stringify(state.cart));
            }
        },
        decQuantity: (state,{payload}) =>{
            const item = state.cart.find(item => item._id === payload);
            if(item && item.quantity>1){
                item.quantity -= 1;
                state.items -= 1;
                state.total -= discountPrice(item.price,item.discount);
                localStorage.setItem("cart",JSON.stringify(state.cart));
            }
        },
        rmvItem: (state,{payload}) =>{
            const item = state.cart.find(item => item._id === payload);
            if(item){
                const index = state.cart.indexOf(item);
                state.items -= item.quantity;
                state.total -= discountPrice(item.price,item.discount)*item.quantity;
                state.cart.splice(index,1);
                localStorage.setItem("cart",JSON.stringify(state.cart));
            }
        },
        emptyCart: (state) =>{
            state.cart = [];
            state.items = 0;
            state.total = 0;
            localStorage.removeItem("cart");
        }
    }

})
export const {addCart,incQuantity,decQuantity,rmvItem,emptyCart} = cartReducer.actions;
export default cartReducer.reducer;