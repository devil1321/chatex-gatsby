import { APITypes } from '../types'
import { Dispatch } from 'redux'
import * as Interfaces from '../interfaces'
import axios from 'axios'
import { rejects } from 'assert';

const instance = axios.create({
    // Set the base URL of your back-end (Express server) running on port 3000
    baseURL: 'https://chatex-14m2.onrender.com/',
  
    // Set the proxy configuration to point to your back-end
    proxy: {
      host: 'chatex-14m2.onrender.com',
      port: 10000,
      protocol: 'https'
    },
    // Enable sending credentials (e.g., cookies) to the back-end
    withCredentials: true,
  });

export const login = (formData:Interfaces.FormDataLogin) => (dispath:Dispatch) =>{
    instance.post('/auth/login',formData)
        .then(res=>{
            dispath({
                type:APITypes.LOGIN,
                user:res.data.user
            })
        }).catch(err => console.log(err))
}
export const googleAuth = () => (dispath:Dispatch) =>{
    window.open("https://chatex-14m2.onrender.com/auth/google", "_self")
}
export const register = (formData:Interfaces.FormDataRegister) => (dispath:Dispatch) =>{
    instance.post('/auth/register',formData)
    .then(res=>{
        dispath({
            type:APITypes.REGISTER,
            user:res.data.user
        })
    }).catch(err => console.log(err))
}
export const logout = () => (dispath:Dispatch) =>{
    localStorage.removeItem('isLogged')
    instance.get('/auth/logout')
    .then(res=>{
        console.log(res.data)
        dispath({
            type:APITypes.LOGOUT,
            user:res.data.user
        })
    }).catch(err => console.log(err))
}
export const isLogged = () => (dispath:Dispatch) =>{
    instance.get('/is-authenticated')
    .then(res=>{
        console.log(res.data)
        dispath({
            type:APITypes.IS_LOGGED,
            user:res.data
        })
    }).catch(err => console.log(err))
}

export const getRooms = ()  => (dispath:Dispatch) =>{
    instance.get('/chat/rooms')
        .then(res => {
            dispath({
                type:APITypes.GET_ROOMS,
                rooms:res.data.rooms
            })
        })
        .catch(err => console.log(err))
}

export const lastRooms = (user:Interfaces.User)  => (dispath:Dispatch) =>{
    instance.post('/chat/last-rooms',user)
    .then(res => {
        dispath({
            type:APITypes.GET_LAST_ROOMS,
            reciver:res.data
        })
    })
    .catch(err => console.log(err))
}
export const createRoom = (room:string)  => (dispath:Dispatch) =>{
    instance.post('/chat/create-room',{room:room})
    .then(res => {
        dispath({
            type:APITypes.CREATE_ROOM,
            msg:res.data
        })
    })
    .catch(err => console.log(err))
}

export const getUser = (email:string) => (dispath:Dispatch) =>{
    instance.post('/user/user',{ email:email })
        .then(res => {
            dispath({
                type:APITypes.GET_USER,
                reciver:res.data
            })
        })
        .catch(err => console.log(err))
}

export const getUsers = ()  => (dispath:Dispatch) =>{
    instance.get('/user/users')
        .then(res => {
            dispath({
                type:APITypes.GET_USERS,
                users:res.data
            })
        })
        .catch(err => console.log(err))
}
export const updateUser = (user:Interfaces.User)  => (dispath:Dispatch) =>{
    instance.post('/user/update',user)
        .then(res => {
            dispath({
                type:APITypes.UPDATE_USER,
                user:res.data
            })
        })
        .catch(err => console.log(err))
}

export const getRoomMessages = (room:string) => (dispatch:Dispatch) =>{
    instance.post('/chat/get-messages',{room:room})
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
    instance.post('/chat/private-messages',data)
        .then(res=>{
            console.log('data',res.data)
            dispatch({
                type:APITypes.GET_PRIVATE_MESSAGES,
                activeRoom:res.data
            })
        })
}

export const sendMessageToRoom = (data:any) => (dispatch:Dispatch) =>{
    instance.post('/chat/message',data)
        .then(res=>{
            dispatch({
                type:APITypes.SEND_MESSAGE_TO_ROOM,
                activeRoom:res.data
            })
        })
}

export const sendPrivateMessage = (data:any) => (dispatch:Dispatch) =>{
    instance.post('/chat/private-message',data)
        .then(res=>{
            dispatch({
                type:APITypes.SEND_PRIVATE_MESSAGE,
                activeRoom:res.data
            })
        })
}
