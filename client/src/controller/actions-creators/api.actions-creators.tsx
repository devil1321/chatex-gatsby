import { APITypes } from '../types'
import { Dispatch } from 'redux'
import * as Interfaces from '../interfaces'
import axios from 'axios'

export const login = (formData:Interfaces.FormDataLogin) => (dispath:Dispatch) =>{
    dispath({
        type:APITypes.LOGIN,
        user:null
    })

}
export const register = (formData:Interfaces.FormDataRegister) => (dispath:Dispatch) =>{
    dispath({
        type:APITypes.REGISTER,
        user:null
    })

}

export const getRooms = ()  => (dispath:Dispatch) =>{
    axios.get('http://localhost:3000/chat/rooms')
        .then(res => {
            dispath({
                type:APITypes.GET_ROOMS,
                rooms:res.data.rooms
            })
        })
        .catch(err => console.log(err))
}


export const getRoomMessages = (room:string) => (dispatch:Dispatch) =>{
    axios.post('http://localhost:3000/chat/get-messages',{room:room})
        .then(res=>{
            dispatch({
                type:APITypes.GET_MESSAGES_FROM_ROOM,
                activeRoom:res.data
            })
        })
}
export const getPrivateMessages = (sender:string,reciver:string) => (dispatch:Dispatch) =>{
    const data = {
        sender,
        reciver
    }
    axios.post('http://localhost:3000/chat/private-messages',data)
        .then(res=>{
            dispatch({
                type:APITypes.GET_PRIVATE_MESSAGES,
                activeRoom:res.data
            })
        })
}

export const sendMessageToRoom = (data:any) => (dispatch:Dispatch) =>{
    axios.post('http://localhost:3000/chat/message',data)
        .then(res=>{
            dispatch({
                type:APITypes.SEND_MESSAGE_TO_ROOM,
                activeRoom:res.data
            })
        })
}

export const sendPrivateMessage = (data:any) => (dispatch:Dispatch) =>{
    axios.post('http://localhost:3000/chat/private-message',data)
        .then(res=>{
            dispatch({
                type:APITypes.SEND_PRIVATE_MESSAGE,
                activeRoom:res.data
            })
        })
}
