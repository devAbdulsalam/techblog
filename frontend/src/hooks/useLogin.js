import { useState, useContext} from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext'
import { LoadingContext } from '../context/LoadingContext';


export const useLogin = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const { setIsLoading} = useContext(LoadingContext);
  const { dispatch } = useAuthContext()

  const login = async (user) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('techstuff', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      //
        navigate('/')
      // update loading state
      setIsLoading(false)
    }
  }

  return { login, error }
}