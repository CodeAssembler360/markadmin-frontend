import { DELETE_CONTACT, GET_CONTACT, GET_CONTACT_BY_ID, UPDATE_CONTACT_BY_ID } from "../../constant"

export const ContactReducer=(state={contact:[],individualContact:{}},action)=>{
    switch(action.type){
        case GET_CONTACT: 
        return {
            ...state,
            contact:action.payload
        }
        case DELETE_CONTACT:
            return{
                ...state,
                contact:state.product.filter(x=>x._id!==action.payload._id)
            }
        case GET_CONTACT_BY_ID:
            return{
                ...state,
                individualContact:action.payload
            }
         case UPDATE_CONTACT_BY_ID:
            return{
                 ...state,
                individualContact:action.payload
            }
        default: return state
    }
}