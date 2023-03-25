import {
  DELETE_ITEM_LIST_BY_ID,
  EDIT_ITEM_LIST_BY_ID,
  GET_ASSEMBLY,
  GET_INGREDIENT_LIST,
  GET_ITEM_LIST,
  POST_ASSEMBLY,
  POST_ITEM_LIST,
  URL_ADDRESS,
} from "../../constant";
import axios from "axios";

export const postAssemblyAction = (obj) => async (dispatch) => {
  await axios
    .post(`${URL_ADDRESS}/addAssembly`, { ...obj, isEditing: false })
    .then((res) => {
      dispatch({
        type: POST_ITEM_LIST,
        payload: res.data,
      });
      console.log("res", res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getAssemblyAction = () => async (dispatch) => {
  await axios
    .get(`${URL_ADDRESS}/getAssembly`)
    .then((res) => {
      dispatch({
        type: GET_ITEM_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const editAssemblyByIdAction = (obj) => async (dispatch) => {
  await axios
    .put(`${URL_ADDRESS}/editAssemblyById`, { ...obj, isEditing: false })
    .then((res) => {
      dispatch({
        type: EDIT_ITEM_LIST_BY_ID,
        payload: { ...obj, isEditing: false },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
export const deleteAssemblyByIdAction = (obj) => async (dispatch) => {
  await axios
    .post(`${URL_ADDRESS}/deleteAssemblyById`, obj)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM_LIST_BY_ID,
        payload: obj,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
