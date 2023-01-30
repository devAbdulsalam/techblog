import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingContext } from '../context/LoadingContext'
import { useNavigate } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'
import { BlogContext } from '../context/BlogContext'
import Blog from '../components/Blog'

const Search = () => {
    const navigate = useNavigate()
    const { query } = useParams()    
    const { blogs } = useContext(BlogContext);
    const { searchblogs, success, error} = useBlogs()
    const { setIsLoading } = useContext(LoadingContext);
    setIsLoading(false)
    useEffect(() => {
        searchblogs(query)
    }, [blogs, query, searchblogs])


  return (
    <div>
        {success ? <div className="w-full">
            {blogs && blogs?.length >= 0 ? blogs.map((blog) => (<Blog key={blog._id} blog={blog} />)) : ''}
          </div> : ''}
    {error || blogs?.length !== 0 ?
        <div className='text-center'>
            <h2 className='text-2xl font-semibold'>No results found</h2>
            <p>Try shortening or rephrasing your search.</p>
            <div>
                <button onClick={() => navigate('/')} className='rounded border-2 order-gray-400 focus:border-gray-700 text-xl'>Back to home</button>
            </div>
        </div>
    : ""} 
    </div>
  )
}

export default Search