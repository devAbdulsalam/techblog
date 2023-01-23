import React, { useEffect, createContext, useContext, useReducer } from 'react'
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
    case 'CREATE_BLOGS':
      return {
        blogs: [action.payload, ...state.blogs]
      }
    case 'UPDATE_BLOGS':
      return {
        blogs: state.blogs.filter(blog => blog._id !== action.payload._id)
      }
    case 'SEARCH_BLOGS':
      return {
        blogs: state.blogs.filter(blog => {
          if (blog.keywords.toLowerCase().includes(action.payload.query) || blog.title.toLowerCase().includes(action.payload.query) || blog.subtitle.toLowerCase().includes(action.payload.query) || blog.author.toLowerCase().includes(action.payload.query)) {
            return blog
          }
          return blog;
        })
      }
    case 'DELETE_BLOGS':
      return {
        blogs: state.blogs.filter(blog => blog._id !== action.payload._id)
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

  // fetch  Blogs
  useEffect(() => {
    setIsLoading(true)
    const fetchBlogs = async () => {
      axios.get("http://localhost:4000/blogs/allblogs")
        .then((res) => {
          dispatch({ type: 'GET_BLOGS', payload: res.data })
          console.log(res)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err.message)
          console.log(err)
          setIsLoading(false)
        })
    }
    fetchBlogs()
  }, [setIsLoading])


  // const searchBlog = (query) =>{
  //   let searchedBlogs = blogs.filter((blog) => (blog.keywords.toLowerCase().includes(query) || blog.title.toLowerCase().includes(query) || blog.subtitle.toLowerCase().includes(query) || blog.author.toLowerCase().includes(query)));
  //   if(!searchedBlogs){
  //     console.log("No blog found")
  //     return setAlert("no blog found")
  //   }
  //   setBlogs(searchedBlogs)
  // }

  return (
    < BlogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ BlogContext.Provider>
  );
};

export default BlogProvider;
