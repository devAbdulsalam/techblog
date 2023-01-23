import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext'
import { LoadingContext } from '../context/LoadingContext'
import { NavbarContext } from '../context/NavbarContext'


export const useLogout = () => {
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const { setIsOpen } = useContext(NavbarContext);
  const { setIsLoading } = useContext(LoadingContext);

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('techstuff')
    setIsLoading(false)
    setIsOpen(false)
    navigate('/login')
    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}