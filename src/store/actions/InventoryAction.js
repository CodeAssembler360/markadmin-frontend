import axios from "axios";
import {
  DELETE_INGERDIENT_LIST_BY_ID,
  EDIT_INGERDIENT_LIST_BY_ID,
  GET_INGREDIENT_LIST,
  POST_INGREDIENT_LIST,
  URL_ADDRESS,
} from "../../constant";

export const postInventoryAction = (obj, _id) => async (dispatch) => {
  if (_id !== undefined) {
    await axios
      .post(`${URL_ADDRESS}/addInventory`, { ...obj, isEditing: false, _id })
      .then((res) => {
        dispatch(getInventoryAction());
        // dispatch({
        //   type: POST_INGREDIENT_LIST,
        //   payload: res.data,
        // });
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    await axios
      .post(`${URL_ADDRESS}/addInventory`, { ...obj, isEditing: false })
      .then((res) => {
        dispatch(getInventoryAction());

        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export const getInventoryAction = () => async (dispatch) => {
  await axios
    .get(`${URL_ADDRESS}/getInventory`)
    .then((res) => {
      dispatch({
        type: GET_INGREDIENT_LIST,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};
export const editInventoryByIdAction = (obj) => async (dispatch) => {
  await axios
    .put(`${URL_ADDRESS}/editInventoryById`, { ...obj, isEditing: false })
    .then((res) => {
      dispatch(getInventoryAction());
    })
    .catch((err) => {
      console.error(err);
    });
};
export const deleteInventoryByIdAction = (obj) => async (dispatch) => {
  await axios
    .post(`${URL_ADDRESS}/deleteInventoryById`, obj)
    .then((res) => {
      dispatch({
        type: DELETE_INGERDIENT_LIST_BY_ID,
        payload: obj,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
