import { APITypes } from '../types'
import { Dispatch } from 'redux'
import * as Interfaces from '../interfaces'

export const login = (formData:Interfaces.FormDataLogin) => (dispath:Dispatch) =>{
    dispath({
        type:APITypes.LOGIN
    })

}
export const register = (formData:Interfaces.FormDataRegister) => (dispath:Dispatch) =>{
    dispath({
        type:APITypes.REGISTER
    })

}