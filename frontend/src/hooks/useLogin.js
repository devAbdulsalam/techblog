import { useState, useContext } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from '../context/LoadingContext'
import axios from "axios";


export const useLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [success, setSuccess] = useState(null)
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

        console.log(data)
        // save the user to local storage
        if (data) {
          window.localStorage.setItem("techstuff", JSON.stringify(data));
        }
        dispatch({ type: 'LOGIN', payload: data })

        navigate(redirectPath, { replace: true })
        setIsLoading(false)

        // update loading state
        setIsLoading(false)
      }).catch(error => {
        setError(error ? error.response?.data.error || error.message : error)
        setIsLoading(false)
      })
  }

    const forgetPassword = async (user) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (user.email === "") {
      setError("Email is required.")
      setIsLoading(false)
    }

    axios.post('https://localhost:4000/user/forget-password', user)
    // axios.post('https://shara-api.onrender.com/user/forget-password', user)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setTimeout(() => {
          navigate("/login")
        }, 5000)
        setIsLoading(false) // save the user to local storage
      }).catch(error => {
        setError(error ? error.response?.data.error || error.message : error)
        setIsLoading(false)
      })
  }
  const resetPassword = async (user) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    const { id, token } = user
    axios.get(`https://shara-api.onrender.com/user/reset-password/${id}/${token}`, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setTimeout(() => {
          setSuccess(null)
        }, 1000)
        setIsLoading(false)
      }).catch(error => {
        if (error.status || error.response.status === 401) {
          setError("Invalid link, or Expired link")
          setTimeout(() => {
            navigate("/forgetPassword")
          }, 1000)
        } else {
          setError("network error: " + error)
          setTimeout(() => {
            navigate("/login")
          }, 1000)
        }
        setIsLoading(false)
      })
  }
  const changePassword = async (user) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (user.confirmPassword === "" || user.password === "") {
      setError("All inputs are required.")
      setIsLoading(false)
    }

    axios.post('https://shara-api.onrender.com/user/change-password', user)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setError(false)
        // setTimeout(() => {
        //   setPhone(data.user.phone)
        // }, 1000)
      }).catch(error => {
        setError(error ? error.response?.data.error || error.message : error)
        setIsLoading(false)
      })
  }

  return { login, forgetPassword, resetPassword, changePassword, success, error }
}