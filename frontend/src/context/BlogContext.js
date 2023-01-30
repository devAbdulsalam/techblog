import React, { useEffect, createContext, useContext, useReducer, useState } from 'react'
import { LoadingContext } from './LoadingContext';
import axios from 'axios';

// create context
export const BlogContext = createContext();

export const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return {
        blogs: action.payload
      }
    case 'CREATE_BLOG':
      return {
        blogs: [action.payload, ...state.blogs]
      }
    case 'UPDATE_BLOG':
      return {
        blogs: state.blogs.map(blog => 
          blog._id === action.payload._id ? action.payload : blog
        ),
      };
    case 'SEARCH_BLOG':
      return {
        blogs: state.blogs.filter(blog => 
          blog.keywords.toLowerCase().includes(action.payload.toLowerCase()) ||
          blog.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          blog.subtitle.toLowerCase().includes(action.payload.toLowerCase()) ||
          blog.author.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case 'DELETE_BLOG':
      return {
        blogs: state.blogs.filter(blog => blog._id !== action.payload)
      }
    default:
      return state
  }
}


const BlogProvider = ({ children }) => {
  //  Blogs state
  const { setIsLoading } = useContext(LoadingContext);
  const [state, dispatch] = useReducer(blogsReducer, {
    blogs: null
  })

  const [isError, setIsError] = useState(false)
  // fetch  Blogs
  useEffect(() => {
    setIsLoading(true)
    const fetchBlogs = async () => {
      axios.get("https://api-techstuff.onrender.com/blogs/allblogs")
        .then((res) => {
          dispatch({ type: 'GET_BLOGS', payload: res.data })
          setIsLoading(false)
        })
        .catch((err) => {
          setIsError(err.message)
          console.log(err.message)
          setIsLoading(false)
        })
    }
    fetchBlogs()
  }, [setIsLoading])


  return (
    < BlogContext.Provider value={{ ...state, dispatch, isError }}>
      {children}
    </ BlogContext.Provider>
  );
};

export default BlogProvider;
