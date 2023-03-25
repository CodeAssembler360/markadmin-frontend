import axios from "axios"
import { DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCT_BY_ID, UPDATE_PRODUCT_BY_ID, URL_ADDRESS } from "../../constant"

export const getProductsAction=()=>async(dispatch)=>{
    await axios.get(`${URL_ADDRESS}/getProducts`)
    .then((res)=>{
    dispatch(
       { type:GET_PRODUCT,
        payload:res.data}
    )
    })
    .catch((err)=>{
        console.log(err,"err")
    })
}
export const deleteProductsAction=(obj)=>async(dispatch)=>{
    await axios.delete(`${URL_ADDRESS}/deleteProduct/${obj._id}`)
    .then((res)=>{
    dispatch(
       { type:DELETE_PRODUCT,
        payload:obj}
    )
    })
    .catch((err)=>{
        console.log(err,"err")
    })
}
export const getProductByIdAction=(obj)=>async(dispatch)=>{
    await axios.get(`${URL_ADDRESS}/getProduct/${obj}`)
    .then((res)=>{
    dispatch(
       { type:GET_PRODUCT_BY_ID,
        payload:res.data}
    )
    })
    .catch((err)=>{
        console.log(err,"err")
    })
}
// const history=useHistory()
export const updateProductAction=(obj,routeChange)=>async(dispatch)=>{
    await axios.put(`${URL_ADDRESS}/updateProduct/${obj._id}`,
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