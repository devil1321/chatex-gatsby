import { Action } from "../actions/chat.actions"
import { ChatTypes } from "../types"

interface ChatState{
    rooms:string[],
    reciver:any;
    room:string;
}

const initState:ChatState = {
    rooms:[],
    reciver:undefined,
    room:''
}

export default (state:any = initState,action:Action) =>{
    switch(action.type){
        case ChatTypes.HANDLE_ROOM:
            return{
                ...state,
                room:action.room
            }
        case ChatTypes.HANDLE_RECIVER:
            return{
                ...state,
                reciver:action.reciver
            }
        
        default:
            return state
    }
}