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
    useEffect(() => {
        setIsLoading(false)
        searchblogs(query)
    }, [blogs, query, searchblogs])


  return (
    <div>
        {success ? <div className="w-full">
            {blogs && blogs?.length >= 0 ? blogs?.map((blog) => (<Blog key={blog?._id} blog={blog} />)) : ''}
          </div> : ''}
    {error || blogs?.length !== 0 ?
        <div className='text-center space-y-2'>
            <h2 className='text-2xl md:text-3xl mt-10 p-2 font-semibold'>No results found</h2>
            <p className=''>Try shortening or rephrasing your search.</p>
            <div>
                <button onClick={() => navigate('/')} className='rounded-full p-2 cursor-pointer border-2 bg-white border-gray-500 focus:border-gray-700 text-lg'>Back to home</button>
            </div>
        </div>
    : ""} 
    </div>
  )
}

export default Search