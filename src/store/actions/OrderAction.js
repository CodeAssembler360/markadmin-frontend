import axios from "axios"
import { DELETE_CHOCOLATE_ORDER, EDIT_CHOCOLATE_ORDER_BY_ID, GET_CHOCOLATE_ORDER, GET_CHOCOLATE_ORDER_BY_ID, POST_CHOCOLATE_ORDER, UPDATE_CHOCOLATE_ORDER_BY_ID, URL_ADDRESS } from "../../constant"



export const postChocolateOrder=(obj,routeChange)=>async(dispatch)=>{
    await axios.post(`${URL_ADDRESS}/newChocolateOrder`,obj)
    .then((res)=>{
        routeChange()

    })
    .catch((err)=>{
        console.log(err)
    })
}
export const getChocolateOrderAction=()=>async(dispatch)=>{
    await axios.get(`${URL_ADDRESS}/getChocolateOrder`)
    .then((res)=>{
        dispatch({
            type:GET_CHOCOLATE_ORDER,
            payload:res.data,
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}
export const deleteChocolateOrderAction=(obj,data)=>async(dispatch)=>{
    await axios.delete(`${URL_ADDRESS}/deleteChocolateOrder/${obj._id}`)
    .then((res)=>{
        dispatch({
            type:DELETE_CHOCOLATE_ORDER,
            payload:obj._id,
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
export const getChocolateOrderByIdAction=(obj)=>async(dispatch)=>{
    await axios.get(`${URL_ADDRESS}/getChocolateOrderById/${obj}`)
    .then((res)=>{
        dispatch({
            type:GET_CHOCOLATE_ORDER_BY_ID,
            payload:res.data,
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
export const editChocolateOrderByIdAction=(obj,data)=>async(dispatch)=>{
    const val=data.find((x)=>x._id==obj._id)
    const value={
       ...val,status:obj.status
    }
    console.log(value,"data")
   await axios.put(`${URL_ADDRESS}/editChocolateOrderById/${obj._id}`,value)
   .then((res)=>{
       dispatch({
           type:EDIT_CHOCOLATE_ORDER_BY_ID,
           payload:value,
       })

   })
   .catch((err)=>{
       console.log(err)
   })
}
export const updateChocolateOrderByIdAction=(obj,routeChange)=>async(dispatch)=>{
   await axios.put(`${URL_ADDRESS}/editChocolateOrderById/${obj._id}`,obj)
   .then((res)=>{
       dispatch({
           type:UPDATE_CHOCOLATE_ORDER_BY_ID,
           payload:obj,
       })
       routeChange()

   })
   .catch((err)=>{
       console.log(err)
   })
}