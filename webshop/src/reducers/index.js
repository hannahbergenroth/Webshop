import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import cartReducer from "./cartReducers";
import productReducer from "./productReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  cart: cartReducer,
  product: productReducer,
});
