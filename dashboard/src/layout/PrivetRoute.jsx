import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router';

export const PrivetRoute = ({ children }) => {
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true }).then(() => {

    }).catch(() => {
        navigate("/login")
    });

    return (
        <>{children}</>
    )
}
