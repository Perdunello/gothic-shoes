import {combineReducers, createStore} from "redux";
import Reducer from "./Reducer";

const reducers = combineReducers({
    reducer: Reducer
})
const store = createStore(reducers)

export default store