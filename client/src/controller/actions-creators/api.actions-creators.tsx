import { APITypes } from '../types'
import { Dispatch } from 'redux'
import * as Interfaces from '../interfaces'
import axios from 'axios'


const access_token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

let instance = axios.create({
    // Set the base URL of your back-end (Express server) running on port 3000
    baseURL: 'http://localhost:3000',
    headers:{
        'Authorization':`Bearer ${access_token}`
    },
    // Set the proxy configuration to point to your back-end
    // Enable sending credentials (e.g., cookies) to the back-end
    withCredentials: true,
});

export const handleToken = (token:string) => (dispatch:Dispatch) =>{
    dispatch({
        type:APITypes.HANDLE_TOKEN,
        token:token
    })
}

export const login = (formData:Interfaces.FormDataLogin) => (dispatch:Dispatch) =>{
    instance.post('/auth/login',formData)
        .then(res=>{
            if(typeof window !== undefined){
                localStorage.setItem('access_token',res.data.access_token)
            }
            dispatch({
                type:APITypes.LOGIN,
                access_token:res.data.token,
                user:res.data.user
            })
        }).catch(err => console.log(err))
}
export const googleAuth = () => (dispatch:Dispatch) =>{
    window.open("https://chatex-14m2.onrender.com/auth/google", "_self")
}
export const register = (formData:Interfaces.FormDataRegister) => (dispatch:Dispatch) =>{
    instance.post('/auth/register',formData)
    .then(res=>{
        if(typeof window !== undefined){
            localStorage.setItem('access_token',res.data.access_token)
        }
        dispatch({
            type:APITypes.REGISTER,
            user:res.data.user
        })
    }).catch(err => console.log(err))
}
export const logout = () => (dispatch:Dispatch) =>{
    if(typeof window !== undefined){
        localStorage.removeItem('access_token')
    }
    instance.get('/auth/logout')
    .then(res=>{
        localStorage.setItem('access_token',res.data.access_token)
        dispatch({
            type:APITypes.LOGOUT,
            user:res.data.user,
        })
    }).catch(err => console.log(err))
}
export const isLogged = () => (dispatch:Dispatch) =>{
    instance.get('/is-authenticated')
    .then(res=>{
        if(res?.data?.token){
            if(typeof window !== undefined){
                localStorage.setItem('access_token',res.data.token)
            }
        }
        dispatch({
            type:APITypes.IS_LOGGED,
            user:res.data,
        })
    }).catch(err => console.log(err))
}

export const getRooms = ()  => (dispatch:Dispatch) =>{
    instance.get('/chat/rooms')
        .then(res => {
            dispatch({
                type:APITypes.GET_ROOMS,
                rooms:res.data.rooms
            })
        })
        .catch(err => console.log(err))
}

export const lastRooms = (user:Interfaces.User)  => (dispatch:Dispatch) =>{
    instance.post('/chat/last-rooms',user)
    .then(res => {
        dispatch({
            type:APITypes.GET_LAST_ROOMS,
            reciver:res.data
        })
    })
    .catch(err => console.log(err))
}
export const createRoom = (room:string)  => (dispatch:Dispatch) =>{
    instance.post('/chat/create-room',{room:room})
    .then(res => {
        dispatch({
            type:APITypes.CREATE_ROOM,
            msg:res.data
        })
    })
    .catch(err => console.log(err))
}

export const getUser = (email:string) => (dispatch:Dispatch) =>{
    instance.post('/user/user',{ email:email })
        .then(res => {
            dispatch({
                type:APITypes.GET_USER,
                reciver:res.data
            })
        })
        .catch(err => console.log(err))
}

export const getUsers = ()  => (dispatch:Dispatch) =>{
    instance.get('/user/users')
        .then(res => {
            dispatch({
                type:APITypes.GET_USERS,
                users:res.data
            })
        })
        .catch(err => console.log(err))
}
export const updateUser = (user:Interfaces.User)  => (dispatch:Dispatch) =>{
    instance.post('/user/update')
        .then(res => {
            dispatch({
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
    instance.post('/chat/private-message')
        .then(res=>{
            dispatch({
                type:APITypes.SEND_PRIVATE_MESSAGE,
                activeRoom:res.data
            })
        })
}
