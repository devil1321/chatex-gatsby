import { combineReducers } from "redux";
import UIReducer from './ui.reducer'
import ChatReducer from './api.reducer'

export const reducers = combineReducers({
    ui:UIReducer,
    chat:ChatReducer
})

export type State = ReturnType<typeof reducers>