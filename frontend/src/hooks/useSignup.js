import { useState, useContext } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from '../context/LoadingContext'
import axios from "axios";


export const useSignup = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);
  const { dispatch } = useAuthContext()
  const redirectPath = location.state?.path || "/"

  const signup = async (user) => {
    if (user.phone === "" || user.name === "" || user.password === "") {
      setError('Fill all input field')
      setTimeout(() => {
        setError(null)
      }, 2000);
      return
    } else if (user.password !== user.cpassword) {
      console.log(user.password, user.cpassword)
      setError("passwords does not match")
      setTimeout(() => {
        setError(null)
      }, 2000);
      return
    }
    setIsLoading(true)
    setError(null)

    axios.post('https://api-techstuff.onrender.com/user/signup', user)
      .then(res => res.data)
      .then(data => {
        console.log(data.message)
        navigate(redirectPath, { replace: true })

        setIsLoading(false) // save the user to local storage
        // // // localStorage.setItem('sharauser', JSON.stringify(data.user))
        console.log(data.message)
        console.log(data)
        localStorage.setItem('techstuff', JSON.stringify(data))
        dispatch({ type: 'LOGIN', payload: data })

        // update loading state
        setIsLoading(false)
      }).catch(error => {
        setError(error ? error.response?.data.error || error.message : error)
        setIsLoading(false)
      })
  }

  return { signup, error }
}