import { useState, useContext } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { LoadingContext } from '../context/LoadingContext';
import { useNavigate } from 'react-router-dom'
import { BlogContext } from '../context/BlogContext';
import axios from "axios";


export const useProfile = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { dispatch  } = useContext(BlogContext);

   const config = { headers:{ 'Authorization': `Bearer ${user.token}` }}


  const getprofile = async (data) => {
    setIsLoading(true)
    setError(null)

    axios.get('https://api-techstuff.onrender.com/profile', data, config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setTimeout(() => {
        dispatch({ type: 'GET_ACCOUNT', payload:data.blog })
        navigate('/')                
        }, 2000);
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }
  // delete blog
  const deleteAccount = (data) =>{
     axios.delete(`https://api-techstuff.onrender.com/profile/delete`, data, config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setTimeout(() => {
          dispatch({ type: 'DELETE_ACCOUNT', payload:data })
        navigate('/')                
        }, 1000);
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
        })
    }
    // like blog
    const updateprofile = (data) =>{
      setIsLoading(true)
     axios.put(`https://api-techstuff.onrender.com/user/profile/update`, data, config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        // dispatch({ type: 'UPDATE_USER', payload:data })
        if (user.user._id === data.user._id) {
            user.user = data?.user;
            user.wallet = data.wallet;
        }   
        localStorage.setItem("techstuff", JSON.stringify(user));
    }).catch(error =>{
        console.log(error)
        setIsLoading(false)
        setError(error.response?.data.error || error.message || error.response || error)
    })
    setIsLoading(false)
  }

    // follow user
  const follow = (data) =>{
     axios.put(`https://api-techstuff.onrender.com/profile/follow`, data, config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
          dispatch({ type: 'UPDATE_ACCOUNT', payload: data })
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }
  // unfollow user
  const unfollow = (data) =>{
     axios.put(`https://api-techstuff.onrender.com/profile/unfollow`, data, config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
          dispatch({ type: 'UPDATE_ACCOUNT', payload: data })
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }

  return {
    error, 
    success, 
    isLoading, 
    follow,
    unfollow,
    deleteAccount,
    getprofile,
    updateprofile,  
   }
}