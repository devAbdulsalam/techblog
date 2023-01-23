import { useState, useContext } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { LoadingContext } from '../context/LoadingContext';

export const useSignup = () => {
  const [error, setError] = useState(null)
  const { setIsLoading } = useContext(LoadingContext);
  const { dispatch } = useAuthContext()

  const signup = async (user) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    const json = await response.json()

    if (!response.ok) {
      dispatch({ type: 'SIGNUP_FAILED', payload: json.error, loading: false, })
      console.log(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('techstuff', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json, loading: false, })

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, error }
}