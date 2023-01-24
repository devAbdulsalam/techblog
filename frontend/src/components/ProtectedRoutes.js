import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext'

const ProtectedRoutes = () => {
    // const user = JSON.parse(localStorage.getItem('techstuff'))

    const { user } = useAuthContext()
    const location = useLocation()
    return (user ? <Outlet /> : <Navigate to="/login" state={{ path: location.pathname }} replace />)

}

export default ProtectedRoutes