import { Action } from "../actions/api.actions"
import { APITypes } from "../types"

const initState = {
    user:null
}

export default (state:any = initState,action:Action) =>{
    switch(action.type){
        case APITypes.LOGIN:
            return{
                ...state
            }
        case APITypes.REGISTER:
            return{
                ...state
            }
        default:
            return state
    }
}