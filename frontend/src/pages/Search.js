import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'
import { BlogContext } from '../context/BlogContext'
import Blog from '../components/Blog'
import Loading from '../components/Loading'

const Search = () => {
    const navigate = useNavigate()
    const { query } = useParams()    
    const { blogs } = useContext(BlogContext);
    const { searchblogs, success, error, isLoading} = useBlogs()
    useEffect(() => {
        const data = { query }
        searchblogs(data)
    }, [blogs, query, searchblogs])


  return (
    <div className='min-h-screen w-full'>
        {success ? <div className="w-full">
            {blogs && blogs?.length >= 0 ? blogs?.map((blog) => (<Blog key={blog?._id} blog={blog} />)) : ''}
          </div> : ''}
        {isLoading ? 
            <div className='h-full w-full'>
            <Loading /> 
            </div>: '' }
    {error ?
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