import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const userOrderService  = createApi({
    reducerPath: 'user-orders',
    tagTypes: "orders",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://perfect-dog-neckerchief.cyclic.app/api/",
        prepareHeaders: (headers,{getState}) => {
            const reducers = getState();
            const token = reducers?.authReducer?.userToken;
            headers.set("authorization",token ? `Bearer ${token}` : "");
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            getOrders: builder.query({
                query: (data) =>{
                    return {
                        url:`/orders?page=${data.page}&userId=${data.userId}`, 
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
            receiveOrder: builder.mutation({
                query: (id) =>{
                    return {
                        url:`/order-update?id=${id}&status=received`,
                        method:'PUT',
                    }
                },
                invalidatesTags: ["orders"]
            }),
            postReview: builder.mutation({
                query: (body) =>{
                    return {
                        url:`/post-review`,
                        method:'POST',
                        body: body
                    }
                },
                invalidatesTags: ["orders"]
            }),
        }
    }
})

export const {useGetOrdersQuery,useGetOrderDetailsQuery,useReceiveOrderMutation,usePostReviewMutation} = userOrderService ;
export default userOrderService ;