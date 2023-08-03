import React,{useEffect} from 'react';
import { navigate } from 'gatsby';
import * as ApiActions from './src/controller/actions-creators/api.actions-creators'
import { bindActionCreators } from 'redux';
import { useDispatch,useSelector } from 'react-redux';
import { State } from './src/controller/reducers';
export const wrapPageElement = ({ element }) => {
  // Check if the user is null (assuming your Redux state structure)

    const dispatch = useDispatch()
    const apiActions = bindActionCreators(ApiActions,dispatch)
    const { user } = useSelector((state:State) => state.api)

    useEffect(()=>{
        if(typeof window !== undefined){
            if(!user){
                apiActions.isLogged()
            }
        }
    },[])

    if(typeof window !== undefined){
        if(localStorage.getItem('access_token') !== null){
            return element
        }else{
            navigate('/login', { replace: true });
        }
    }
};