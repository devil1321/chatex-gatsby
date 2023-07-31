import { APITypes } from '../types'
import { Dispatch } from 'redux'
import * as Interfaces from '../interfaces'
import axios from 'axios'

export const login = (formData:Interfaces.FormDataLogin) => (dispath:Dispatch) =>{
    axios.post('http://localhost:3000/auth/login',formData)
        .then(res=>{
            dispath({
                type:APITypes.LOGIN,
                user:res.data.user
            })
        }).catch(err => console.log(err))
}
export const googleAuth = () => (dispath:Dispatch) =>{
    axios.get('http://localhost:3000/auth/google')
        .then(res=>{
            dispath({
                type:APITypes.GOOGLE_AUTH,
                user:res.data.user
            })
        }).catch(err => console.log(err))
}
export const register = (formData:Interfaces.FormDataRegister) => (dispath:Dispatch) =>{
    axios.post('http://localhost:3000/auth/register',formData)
    .then(res=>{
        dispath({
            type:APITypes.REGISTER,
            user:res.data.user
        })
    }).catch(err => console.log(err))
}
export const logout = () => (dispath:Dispatch) =>{
    axios.get('http://localhost:3000/auth/logout')
    .then(res=>{
        console.log(res.data)
        dispath({
            type:APITypes.LOGOUT,
            user:res.data.user
        })
    }).catch(err => console.log(err))
}
export const isLogged = () => (dispath:Dispatch) =>{
    axios.get('http://localhost:3000')
    .then(res=>{
        dispath({
            type:APITypes.IS_LOGGED,
            user:res.data.user
        })
    }).catch(err => console.log(err))
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

export const lastRooms = (user:Interfaces.User)  => (dispath:Dispatch) =>{
    axios.post('http://localhost:3000/chat/last-rooms',user)
    .then(res => {
        dispath({
            type:APITypes.GET_LAST_ROOMS,
            reciver:res.data
        })
    })
    .catch(err => console.log(err))
}
export const createRoom = (room:string)  => (dispath:Dispatch) =>{
    axios.post('http://localhost:3000/chat/create-room',{room:room})
    .then(res => {
        dispath({
            type:APITypes.CREATE_ROOM,
            msg:res.data
        })
    })
    .catch(err => console.log(err))
}

export const getUser = (email:string) => (dispath:Dispatch) =>{
    axios.post('http://localhost:3000/user/user',{ email:email })
        .then(res => {
            dispath({
                type:APITypes.GET_USER,
                reciver:res.data
            })
        })
        .catch(err => console.log(err))
}

export const getUsers = ()  => (dispath:Dispatch) =>{
    axios.get('http://localhost:3000/user/users')
        .then(res => {
            dispath({
                type:APITypes.GET_USERS,
                users:res.data
            })
        })
        .catch(err => console.log(err))
}
export const updateUser = (user:Interfaces.User)  => (dispath:Dispatch) =>{
    axios.post('http://localhost:3000/user/update',user)
        .then(res => {
            dispath({
                type:APITypes.UPDATE_USER,
                user:res.data
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
export const getPrivateMessages = (sender:string,reciver:string,room:string) => (dispatch:Dispatch) =>{
    const data = {
        sender,
        reciver,
        room
    }
    axios.post('http://localhost:3000/chat/private-messages',data)
        .then(res=>{
            console.log('data',res.data)
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
