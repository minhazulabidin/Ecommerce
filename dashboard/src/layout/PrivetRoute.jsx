import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

export const PrivetRoute = ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true }).then(() => {

        }).catch(() => {
            navigate("/login")
        });
    }, [navigate])

    return (
        <>{children}</>
    )
}
