import { DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCT_BY_ID, UPDATE_PRODUCT_BY_ID } from "../../constant"

export const ProductReducer=(state={product:[],individualProduct:{}},action)=>{
    switch(action.type){
        case GET_PRODUCT: 
        return {
            ...state,
            product:action.payload
        }
        case DELETE_PRODUCT:
            return{
                ...state,
                product:state.product.filter(x=>x._id!==action.payload._id)
            }
        case GET_PRODUCT_BY_ID:
            return{
                ...state,
                individualProduct:action.payload
            }
         case UPDATE_PRODUCT_BY_ID:
            return{
                 ...state,
                individualProduct:action.payload
            }
        default: return state
    }
}