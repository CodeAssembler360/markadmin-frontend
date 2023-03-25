import axios from "axios"
import {  DELETE_CONTACT, GET_CONTACT, GET_CONTACT_BY_ID, URL_ADDRESS } from "../../constant"

export const getContactsAction=()=>async(dispatch)=>{
    await axios.get(`${URL_ADDRESS}/getContacts`)
    .then((res)=>{
    dispatch(
       { type:GET_CONTACT,
        payload:res.data}
    )
    })
    .catch((err)=>{
        console.log(err,"err")
    })
}
export const deleteContactAction=(obj)=>async(dispatch)=>{
    await axios.delete(`${URL_ADDRESS}/deleteContact/${obj._id}`)
    .then((res)=>{
    dispatch(
       { type:DELETE_CONTACT,
        payload:obj}
    )
    })
    .catch((err)=>{
        console.log(err,"err")
    })
}
export const getContactByIdAction=(obj)=>async(dispatch)=>{
    await axios.get(`${URL_ADDRESS}/getContactById/${obj}`)
    .then((res)=>{
    dispatch(
       { type:GET_CONTACT_BY_ID,
        payload:res.data}
    )
    })
    .catch((err)=>{
        console.log(err,"err")
    })
}
// const history=useHistory()
export const updateContactAction=(obj,routeChange)=>async(dispatch)=>{
    await axios.put(`${URL_ADDRESS}/updateContact/${obj._id}`,
    obj)
    .then((res)=>{

        console.log("back",res.data)
        routeChange()
        // history.push('/ecom-product-list')
    // dispatch(
    //    { type:UPDATE_PRODUCT_BY_ID,
    //     payload:obj}
    // )
    })
    .catch((err)=>{
        console.log(err,"err")
    })
}