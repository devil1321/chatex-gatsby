import React,{ useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import * as ApiActions from './src/controller/actions-creators/api.actions-creators'
import { State } from './src/controller/reducers'
import { navigate } from 'gatsby'
import { bindActionCreators } from 'redux'

export const wrapPageElement = ({ element, props }) => {
    const [isAuth,setIsAuth] = useState(false)

    const dispatch = useDispatch()
    const apiActions = bindActionCreators(ApiActions,dispatch)
    const { user } = useSelector((state:State)=>state.api)

    useEffect(()=>{
        if(!user){
            apiActions.isLogged()
        }else{
            setIsAuth(true)
        }
    },[])

    if(isAuth){
        return element
    }else{
        navigate('/login')
    }
  };