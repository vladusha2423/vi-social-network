import React from 'react';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const RequireAuth = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            console.log('!! localStorage.getItem(token): ', localStorage.getItem('token'));
            navigate('/auth')
        }
    }, [])

    return children;
}
