import {
  DELETE_CHOCOLATE_ORDER,
  EDIT_CHOCOLATE_ORDER_BY_ID,
  GET_CHOCOLATE_ORDER,
  GET_CHOCOLATE_ORDER_BY_ID,
  UPDATE_CHOCOLATE_ORDER_BY_ID,
} from "../../constant";

export const OrderReducer = (
  state = { order: [], individualOrder: {} },
  action
) => {
  switch (action.type) {
    case GET_CHOCOLATE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case DELETE_CHOCOLATE_ORDER:
      return {
        ...state,
        order: state.order.filter((x) => x._id !== action.payload),
      };
    case GET_CHOCOLATE_ORDER_BY_ID:
      return {
        ...state,
        individualOrder: action.payload,
      };
      case EDIT_CHOCOLATE_ORDER_BY_ID:
        return{
          ...state,
          order:state.order.map((x)=>x._id==action.payload._id?action.payload:x)
        }
        case UPDATE_CHOCOLATE_ORDER_BY_ID:
        return{
          ...state,
          individualOrder:action.payload
        }
    default:
      return state;
  }
};
