import { useState, useContext } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { LoadingContext } from '../context/LoadingContext';
import { useNavigate } from 'react-router-dom'
import { BlogContext } from '../context/BlogContext';
import axios from "axios";


export const useBlogs = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { dispatch  } = useContext(BlogContext);

   const config = { headers:{ 'Authorization': `Bearer ${user.token}` }}


  const getblog = async () => {
    setIsLoading(true)
    setError(null)

    axios.get('https://api-techstuff.onrender.com/blogs', config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setTimeout(() => {
        dispatch({ type: 'GET_BLOG', payload:data.blog })
        navigate('/')                
        }, 2000);
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }
  const getblogs = async () => {
    setIsLoading(true)
    setError(null)

    axios.get('https://api-techstuff.onrender.com/blogs', config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setTimeout(() => {
        dispatch({ type: 'ALL_BLOG', payload:data.blog })
        navigate('/')                
        }, 2000);
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }
  const getallblogs = async () => {
    setIsLoading(true)
    setError(null)

    axios.get('https://api-techstuff.onrender.com/blogs/allblogs', config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setTimeout(() => {
        dispatch({ type: 'ALL_BLOG', payload:data.blog })
        navigate('/')                
        }, 2000);
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }

  const searchblogs = async (query) => {
    setIsLoading(true)
    setError(null)

    axios.get('https://api-techstuff.onrender.com/blogs/search', query, config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setTimeout(() => {
        // dispatch({ type: 'CREATE_BLOG', payload:data.blog })
        console.log(data)
        navigate('/')                
        }, 2000);
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }

  const createblog = (blog) =>{
    axios.post('https://api-techstuff.onrender.com/blogs', blog, config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setTimeout(() => {
        dispatch({ type: 'CREATE_BLOG', payload:data.blog })
        navigate('/')                
        }, 2000);
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }


  const editblog = (blog, id) =>{
    axios.post(`https://api-techstuff.onrender.com/blogs/${id}`, blog, config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setTimeout(() => {        
          dispatch({ type: 'UPDATE_BLOG', payload: data.blog })
          navigate(`/${id}`)                
        }, 500);
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }

  // delete blog
  const deleteblog = (id) =>{
     axios.delete(`https://api-techstuff.onrender.com/blogs/${id}`, config)
      .then(res => res.data)
      .then(data => {
        setSuccess(data.message)
        setIsLoading(false)
        setTimeout(() => {
          dispatch({ type: 'DELETE_BLOG', payload:id })
        navigate('/')                
        }, 1000);
      }).catch(error =>{
        console.log(error)
          setIsLoading(false)
      })
  }

  return {createblog, getblog, getallblogs, getblogs, searchblogs, editblog, deleteblog, error, success, isLoading}
}