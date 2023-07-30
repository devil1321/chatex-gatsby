import { Action } from "../actions/api.actions"
import { APITypes } from "../types"

interface APIState{
    user:any;
    users:any[];
    rooms:string[];
    msg:any;
    activeRoom:{
        room:string;
        messages:{
            user:any;
            message:string;
        }[]
    }
}

const initState:APIState = {
    user:null,
    users:[],
    rooms:[],
    msg:'',
    activeRoom:{
        room:'',
        messages:[]
    }
}

export default (state:any = initState,action:Action) =>{
    switch(action.type){
        case APITypes.LOGIN:
            return{
                ...state,
                user:action.user
            }
        case APITypes.REGISTER:
            return{
                ...state,
                user:action.user
            }
        case APITypes.GET_ROOMS:
            return{
                ...state,
                rooms:action.rooms
            }
        case APITypes.GET_USERS:
            return{
                ...state,
                users:action.users
            }
        case APITypes.GET_USER:
            return{
                ...state,
                reciver:action.reciver
            }
        case APITypes.GET_MESSAGES_FROM_ROOM:
            return{
                ...state,
                activeRoom:action.activeRoom
            }
        case APITypes.GET_PRIVATE_MESSAGES:
            return{
                ...state,
                activeRoom:action.activeRoom
            }
        case APITypes.SEND_MESSAGE_TO_ROOM:
            return{
                ...state,
                activeRoom:action.activeRoom
            }
        default:
            return state
    }
}