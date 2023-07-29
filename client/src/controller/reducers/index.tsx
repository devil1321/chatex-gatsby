import { combineReducers } from "redux";
import UIReducer from './ui.reducer'
import ApiReducer from './api.reducer'
import chatReducer from "./chat.reducer";

export const reducers = combineReducers({
    ui:UIReducer,
    chat:chatReducer,
    api:ApiReducer
})

export type State = ReturnType<typeof reducers>