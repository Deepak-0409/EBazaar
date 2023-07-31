import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const homeProducts = createApi({
    reducerPath: 'homeProducts',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://perfect-dog-neckerchief.cyclic.app/api/",
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
            }),
            searchProducts: builder.query({
                query: (params ) => {
                    return {
                        url: `search-products/${params.keyword}/${params.page}`,
                        method: 'GET'  
                    }
                }
            })
        }
    }
})

export const {useCategoryProductsQuery,useSearchProductsQuery} = homeProducts; 
export default homeProducts;