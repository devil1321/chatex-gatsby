import { ChatTypes } from '../types'

interface HANDLE_ROOM {
    type:ChatTypes.HANDLE_ROOM,
    room:string
}

interface HANDLE_RECIVER {
    type:ChatTypes.HANDLE_RECIVER,
    reciver:any
}

export type Action = HANDLE_ROOM | HANDLE_RECIVER 