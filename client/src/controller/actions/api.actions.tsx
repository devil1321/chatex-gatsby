import { APITypes } from '../types'

interface LOGIN {
    type:APITypes.LOGIN;
    user:any;
}
interface HANDLE_TOKEN {
    type:APITypes.HANDLE_TOKEN
    token:any;
}
interface REGISTER {
    type:APITypes.REGISTER;
    user:any;
}

interface LOGOUT {
    type:APITypes.LOGOUT;
    user:any;
}
interface IS_LOGGED {
    type:APITypes.IS_LOGGED;
    user:any;
}
interface GET_ROOMS {
    type:APITypes.GET_ROOMS
    rooms:any[]
}
interface GET_USER {
    type:APITypes.GET_USER
    reciver:any
}
interface UPDATE_USER {
    type:APITypes.UPDATE_USER
    user:any
}
interface GET_USERS {
    type:APITypes.GET_USERS
    users:any[]
}
interface GET_LAST_ROOMS {
    type:APITypes.GET_LAST_ROOMS
    lastRooms:any[]
}
interface CREATE_ROOM {
    type:APITypes.CREATE_ROOM
    msg:any
}

interface GET_MESSAGES_FROM_ROOM {
    type:APITypes.GET_MESSAGES_FROM_ROOM
    activeRoom:any
}
interface GET_PRIVATE_MESSAGES {
    type:APITypes.GET_PRIVATE_MESSAGES
    activeRoom:any
}
interface SEND_MESSAGE_TO_ROOM {
    type:APITypes.SEND_MESSAGE_TO_ROOM
    activeRoom:any
}
interface SEND_PRIVATE_MESSAGE {
    type:APITypes.SEND_PRIVATE_MESSAGE
    activeRoom:any
}

export type Action = HANDLE_TOKEN | LOGIN | REGISTER | LOGOUT | IS_LOGGED | GET_ROOMS | CREATE_ROOM | UPDATE_USER | GET_USERS | GET_USER | GET_MESSAGES_FROM_ROOM | GET_LAST_ROOMS | GET_PRIVATE_MESSAGES | SEND_MESSAGE_TO_ROOM | SEND_PRIVATE_MESSAGE 