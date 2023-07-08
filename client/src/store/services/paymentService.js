import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const paymentService = createApi({
    reducerPath: 'payment',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3500/api/'
    }),
    endpoints: (builder) => {
        return {
            sendPayment: builder.mutation({
                query: (cartData) =>{
                    return {
                        url:'/create-checkout-session',
                        method:'POST',
                        body: cartData
                    }
                }
            }),  
        }
    }
})

export const {useSendPaymentMutation} = paymentService;
export default paymentService;