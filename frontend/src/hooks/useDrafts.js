import { useState, useContext } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from '../context/LoadingContext'
import axios from "axios";

export const useNewBlog = () => {
  const [error, setError] = useState(null)
  const { setIsLoading } = useContext(LoadingContext);
  const { dispatch } = useAuthContext()

    // all drafts
  const alldraft = async (blog) => {
    setIsLoading(true)
    setError(null)

    axios.post('https://api-techstuff.onrender.com/drafts/save-draft', blog)
      .then(res => res.data)
      .then(data => {
        setIsLoading(false)
        setSuccess(data.message)
        console.log(data)

        // save the user to local storage
        // localStorage.setItem('sharauser', JSON.stringify(json))

         // update the auth context
        dispatch({type: 'SUCCESS', payload: "Blog "})
      
      }).catch(error => {
      setIsLoading(false)
      setError(error)
      console.log(error)
    })
  }
    // newdrafts
  const newdraft = async (blog) => {
    setIsLoading(true)
    setError(null)

    axios.post('https://api-techstuff.onrender.com/drafts/save-draft', blog)
      .then(res => res.data)
      .then(data => {
        setIsLoading(false)
        setSuccess(data.message)
        console.log(data)

        // save the user to local storage
        // localStorage.setItem('sharauser', JSON.stringify(json))

         // update the auth context
        // dispatch({type: 'SUCCESS', payload: "Blog "})
      
      }).catch(error => {
      setIsLoading(false)
      setError(error)
      console.log(error)
    })
  }
    // singledrafts
  const singledraft = async (blog) => {
    setIsLoading(true)
    setError(null)

    axios.post('https://api-techstuff.onrender.com/drafts/save-draft', blog)
      .then(res => res.data)
      .then(data => {
        setIsLoading(false)
        setSuccess(data.message)
        console.log(data)

        // save the user to local storage
        // localStorage.setItem('sharauser', JSON.stringify(json))

         // update the auth context
        // dispatch({type: 'SUCCESS', payload: "Blog "})
      
      }).catch(error => {
      setIsLoading(false)
      setError(error)
      console.log(error)
    })
  }
    // newdrafts
  const deletedraft = async (blog) => {
    setIsLoading(true)
    setError(null)

    axios.post('https://api-techstuff.onrender.com/drafts/save-draft', blog)
      .then(res => res.data)
      .then(data => {
        setIsLoading(false)
        setSuccess(data.message)
        console.log(data)

        // save the user to local storage
        // localStorage.setItem('sharauser', JSON.stringify(json))

         // update the auth context
        // dispatch({type: 'SUCCESS', payload: "Blog "})
      
      }).catch(error => {
      setIsLoading(false)
      setError(error)
      console.log(error)
    })
  }

  return { alldraft, newdraft, singledraft, deletedraft, error, success }
}