import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const homeProducts = createApi({
    reducerPath: 'homeProducts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3500/api/',
    }),
    endpoints: (builder) => {
        return {
            categoryProducts: builder.query({
                query: ({name, page}) => {
                    return {
                        url: `category-products/${name}/${page}`,
                        method: 'GET'  
                    }
                }
            })
        }
    }
})

export const {useCategoryProductsQuery} = homeProducts; 
export default homeProducts;