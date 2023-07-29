import { ChatTypes } from '../types'
import { Dispatch } from 'redux'
import * as Interfaces from '../interfaces'

export const handleRoom = (room:string) => (dispatch:Dispatch) =>{
    dispatch({
        type:ChatTypes.HANDLE_ROOM,
        room:room
    })
}

export const handleReciver = (reciver:string) => (dispatch:Dispatch) =>{
    dispatch({
        type:ChatTypes.HANDLE_RECIVER,
        reciver:reciver
    })
}


