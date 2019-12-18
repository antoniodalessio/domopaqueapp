import { combineReducers } from "redux";
import { environmentsReducer }  from "./environments";

// Combine reducers
const reducersCombine = combineReducers({
  environmentsReducer
});

export default reducersCombine;