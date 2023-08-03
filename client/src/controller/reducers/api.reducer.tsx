import { Action } from "../actions/api.actions"
import { APITypes } from "../types"

interface APIState{
    user:any;
    access_token:string | null;
    users:any[];
    rooms:string[];
    msg:any;
    lastRooms:any[]
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
    access_token:null,
    msg:'',
    lastRooms:[],
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
        case APITypes.GOOGLE_AUTH:
            return{
                ...state,
                user:action.user
            }
        case APITypes.LOGOUT:
            return{
                ...state,
                user:action.user
            }
        case APITypes.IS_LOGGED:
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
        case APITypes.UPDATE_USER:
            return{
                ...state,
                user:action.user
            }
        case APITypes.GET_LAST_ROOMS:
            return{
                ...state,
                lastRooms:action.lastRooms
            }
        case APITypes.CREATE_ROOM:
            return{
                ...state,
                msg:action.msg
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