import {
  DELETE_EXPENSES_LIST_BY_ID,
  DELETE_RECIPE_LIST_BY_ID,
  EDIT_EXPENSES_LIST_BY_ID,
  GET_EXPENSES_LIST,
  GET_RECIPE_LIST,
  GET_RECIPE_LIST_BY_ID,
} from "../../constant";

export const ExpensesReducer = (
  state = { expensesList: [], recipeList: [], individualRecipe: {} },
  action
) => {
  switch (action.type) {
    case GET_EXPENSES_LIST:
      return {
        ...state,
        expensesList: action.payload,
      };
    case EDIT_EXPENSES_LIST_BY_ID:
      return {
        ...state,
        expensesList: state.expensesList.map((x) =>
          x._id == action.payload._id
            ? { ...action.payload, isEditing: false }
            : x
        ),
      };
    case DELETE_EXPENSES_LIST_BY_ID:
      return {
        ...state,
        expensesList: state.expensesList.filter(
          (x) => x._id != action.payload._id
        ),
      };
    case GET_RECIPE_LIST:
      return {
        ...state,
        recipeList: action.payload,
      };
    case GET_RECIPE_LIST_BY_ID:
      return {
        ...state,
        individualRecipe: action.payload,
      };
    case DELETE_RECIPE_LIST_BY_ID:
      return {
        ...state,
        recipeList: state.recipeList.filter((x) => x._id != action.payload._id),
      };
    default:
      return state;
  }
};
