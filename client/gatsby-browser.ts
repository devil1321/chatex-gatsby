import React,{useEffect,useState} from 'react';
import { navigate } from 'gatsby';
export const wrapPageElement = ({ element }) => {
  // Check if the user is null (assuming your Redux state structure)

    if(localStorage.getItem('access_token') !== null){
        return element
    }else{
        navigate('/login', { replace: true });
    }
};