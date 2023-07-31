import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const orderService  = createApi({
    reducerPath: 'orders',
    tagTypes: "orders",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://perfect-dog-neckerchief.cyclic.app/api/",
        prepareHeaders: (headers,{getState}) => {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            headers.set("authorization",token ? `Bearer ${token}` : "");
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            getOrders: builder.query({
                query: (page) =>{
                    return {
                        url:`/orders?page=${page}`,
                        method:'GET',
                    }
                },
                providesTags: ["orders"]
            }), 
            getOrderDetails: builder.query({
                query: (id) =>{
                    return {
                        url:`/order-details/${id}`,
                        method:'GET',
                    }
                },
                providesTags: ["orders"]
            }), 
            dispatchOrder: builder.mutation({
                query: (id) =>{
                    return {
                        url:`/order-update?id=${id}&status=dispatched`,
                        method:'PUT',
                    }
                },
                invalidatesTags: ["orders"]
            }), 
             
        }
    }
})

export const {useGetOrdersQuery,useGetOrderDetailsQuery,useDispatchOrderMutation} = orderService ;
export default orderService ;