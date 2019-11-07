import {createStore, applyMiddleware, combineReducers} from "redux"
import promiseMiddleware from "redux-promise-middleware"
import usersReducer from "./userReducer"

const rootReducer = combineReducers({
    usersReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))