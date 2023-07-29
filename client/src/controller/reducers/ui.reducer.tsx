import { UITypes } from "../types"
import { Action } from "../actions/ui.actions"

const initState = {}

export default (state:any = initState,action:Action) =>{
    switch(action.type){
        case UITypes.HANDLE_CRED_INPUT_BORDER:
            return{
                ...state
            }
        case UITypes.HANDLE_CRED_INPUT_FOCUS:
            return{
                ...state
            }
        case UITypes.HANDLE_SIDEBAR:
            return{
                ...state
            }
        default:
            return state
    }
}