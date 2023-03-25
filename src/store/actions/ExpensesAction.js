import axios from "axios";
import {
  DELETE_EXPENSES_LIST_BY_ID,
  DELETE_RECIPE_LIST_BY_ID,
  EDIT_EXPENSES_LIST_BY_ID,
  GET_EXPENSES_LIST,
  GET_RECIPE_LIST,
  GET_RECIPE_LIST_BY_ID,
  URL_ADDRESS,
} from "../../constant";

export const postExpensesAction = (obj, result) => async (dispatch) => {
  obj.map(async (item, index) => {
    await axios
      .post(`${URL_ADDRESS}/addExpenses`, { ...item, isEditing: false })
      .then((res) => {
        if (result.length > 0 && obj.length == index + 1) {
          result.map(async (x) => {
            await axios
              .post(`${URL_ADDRESS}/addInventory`, { ...x, isEditing: false })
              .then((res) => {
                console.log(res.data, "ingredient");
              })
              .catch((err) => {
                console.error(err);
              });
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
export const getExpensesAction = () => async (dispatch) => {
  await axios
    .get(`${URL_ADDRESS}/getExpenses`)
    .then((res) => {
      dispatch({
        type: GET_EXPENSES_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
export const editExpensesByIdAction = (obj) => async (dispatch) => {
  await axios
    .put(`${URL_ADDRESS}/editExpensesById`, { ...obj, isEditing: false })
    .then((res) => {
      dispatch({
        type: EDIT_EXPENSES_LIST_BY_ID,
        payload: { ...obj, isEditing: false },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
export const deleteExpensesByIdAction = (obj) => async (dispatch) => {
  await axios
    .post(`${URL_ADDRESS}/deleteExpensesById`, obj)
    .then((res) => {
      dispatch({
        type: DELETE_EXPENSES_LIST_BY_ID,
        payload: obj,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const postRecipeAction = (obj) => async (dispatch) => {
  await axios
    .post(`${URL_ADDRESS}/addRecipe`, obj)
    .then((res) => {})
    .catch((err) => {
      console.error(err);
    });
};
export const getRecipeAction = () => async (dispatch) => {
  await axios
    .get(`${URL_ADDRESS}/getRecipe`)
    .then((res) => {
      dispatch({
        type: GET_RECIPE_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
export const getRecipeActionById = (obj) => async (dispatch) => {
  await axios
    .post(`${URL_ADDRESS}/getRecipeById/${obj}`)
    .then((res) => {
      dispatch({
        type: GET_RECIPE_LIST_BY_ID,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
export const deleteRecipeActionById = (obj) => async (dispatch) => {
  await axios
    .post(`${URL_ADDRESS}/deleteRecipeById`, obj)
    .then((res) => {
      dispatch({
        type: DELETE_RECIPE_LIST_BY_ID,
        payload: obj,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
