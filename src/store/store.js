import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import PostsReducer from "./reducers/PostsReducer";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer";
import todoReducers from "./reducers/Reducers";
import { reducer as reduxFormReducer } from "redux-form";
import { ProductReducer } from "./reducers/ProductReducer";
import { ContactReducer } from "./reducers/ContactReducer";
import { OrderReducer } from "./reducers/OrderReducer";
import { InventoryReducer } from "./reducers/InventoryReducer";
import { ExpensesReducer } from "./reducers/ExpensesReducer";
const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  todoReducers,
  products: ProductReducer,
  contacts: ContactReducer,
  orders: OrderReducer,
  inventory: InventoryReducer,
  expense: ExpensesReducer,
  form: reduxFormReducer,
});

//const store = createStore(rootReducers);

export const store = createStore(reducers, composeEnhancers(middleware));
