import { APITypes } from '../types'

interface LOGIN {
    type:APITypes.LOGIN;
    user:any;
}
interface REGISTER {
    type:APITypes.REGISTER;
    user:any;
}
interface GET_ROOMS {
    type:APITypes.GET_ROOMS
    rooms:any[]
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

export type Action = LOGIN | REGISTER | GET_ROOMS | GET_MESSAGES_FROM_ROOM | GET_PRIVATE_MESSAGES | SEND_MESSAGE_TO_ROOM | SEND_PRIVATE_MESSAGE