import {
  DELETE_INGERDIENT_LIST_BY_ID,
  DELETE_ITEM_LIST_BY_ID,
  EDIT_INGERDIENT_LIST_BY_ID,
  EDIT_ITEM_LIST_BY_ID,
  GET_INGREDIENT_LIST,
  GET_ITEM_LIST,
  POST_INGREDIENT_LIST,
  POST_ITEM_LIST,
} from "../../constant";

export const InventoryReducer = (
  state = { ingredientList: [], itemList: [] },
  action
) => {
  switch (action.type) {
    case GET_INGREDIENT_LIST:
      return {
        ...state,
        ingredientList: action.payload,
      };
    case POST_INGREDIENT_LIST:
      return {
        ...state,
        ingredientList: [...state.ingredientList, action.payload],
      };
    case EDIT_INGERDIENT_LIST_BY_ID:
      return {
        ...state,
        ingredientList: state.ingredientList.map((x) =>
          x._id == action.payload._id
            ? { ...action.payload, isEditing: false }
            : x
        ),
      };
    case DELETE_INGERDIENT_LIST_BY_ID:
      return {
        ...state,
        ingredientList: state.ingredientList.filter(
          (x) => x._id != action.payload._id
        ),
      };
    case GET_ITEM_LIST:
      return {
        ...state,
        itemList: action.payload,
      };
    case POST_ITEM_LIST:
      return {
        ...state,
        itemList: [...state.itemList, action.payload],
      };
    case EDIT_ITEM_LIST_BY_ID:
      return {
        ...state,
        itemList: state.itemList.map((x) =>
          x._id == action.payload._id
            ? { ...action.payload, isEditing: false }
            : x
        ),
      };
    case DELETE_ITEM_LIST_BY_ID:
      return {
        ...state,
        itemList: state.itemList.filter((x) => x._id != action.payload._id),
      };

    default:
      return state;
  }
};
