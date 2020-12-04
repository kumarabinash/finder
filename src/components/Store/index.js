
import {createStore} from "redux";
import thunk from "redux-thunk";
import {applyMiddleware} from "redux";

// Reducers
import UserReducer from "./Reducers/UserReducer";

const store = createStore(UserReducer, applyMiddleware(thunk));

export {store};
