import { useState, useContext } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from '../context/LoadingContext'
import axios from "axios";


export const useLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);
  const { dispatch } = useAuthContext()
  const redirectPath = location.state?.path || "/"

  const login = async (user) => {

    if (user.phone === "" || user.password === "") {
      setError("Fill in all input fields")
      setTimeout(() => {
        setError(null)
      }, 2000);
      return
    }
    setIsLoading(true)
    setError(null)

    axios.post('https://api-techstuff.onrender.com/user/login', user)
      .then(res => res.data)
      .then(data => {
        console.log(data.message)
        navigate(redirectPath, { replace: true })

        setIsLoading(false) // save the user to local storage
        // // // localStorage.setItem('sharauser', JSON.stringify(data.user))
        console.log(data.message)
        console.log(data)
        localStorage.setItem('techstuff', JSON.stringify({data}))
        dispatch({ type: 'LOGIN', payload: data})

        // update loading state
        setIsLoading(false)
      }).catch(error => {
        setError(error ? error.response?.data.error || error.message : error)
        setIsLoading(false)
      })
  }

  return { login, error}
}