import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingContext } from '../context/LoadingContext'
import Loading from '../components/Loading'
import { useBlogs } from '../hooks/useBlogs'
import { BlogContext } from '../context/BlogContext'

const EditBlog = () => {
    const { id } = useParams()    
    const { blogs } = useContext(BlogContext);
    const { editblog, success, error} = useBlogs()
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [content, setContent] = useState('')
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    setIsLoading(false)
    useEffect(() => {
        if(blogs && blogs.length !== 0){
            let blog = blogs.filter(blog => blog._id === id)
                setTitle(blog[0].title || '')
                setSubtitle(blog[0].subtitle || '')
                setContent(blog[0].content || '')
            }
    }, [blogs, id, setIsLoading])

    


    // //update blog
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (title === "" || subtitle === "" || content === "") {
            console.log("fill all input field")
        } else {
            const blog = { id, title, subtitle, content }
            editblog(blog, id)
        }
    }
    return (
        <section className={`flex h-screen w-full bg-black/5 z-[997] transition-all duration-300  place-items-center`}>

            {!isLoading || error ? <div className='w-full flex place-content-center p-2 md:p-10'>
                <div className='bg-gray p-2 mt-10 rounded-md shadow-xl bg-white'>
                    <form onSubmit={handleSubmit} className="pb-10 p-2 mx-1">
                        <h1 className="text-center text-4xl font-bold py-5">Edit Blog post</h1>
                        <div className="row">
                            <label htmlFor="tittle" className='text-xl font-bold p-2'>Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="px-3 my-2 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-2 border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="subtitle" className='text-xl font-bold p-2'>Subtitle</label>
                            <input
                                type="text"
                                id="subtitle"
                                name="subtitle"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                placeholder="subtitle"
                                className="px-3 my-2 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-2 border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="content" className='text-xl font-bold p-2'>Body</label>
                            <textarea
                                type="text"
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Body"
                                className="px-3 my-2 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-2 border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                required
                                cols="50"
                                rows="10"
                            >
                            </textarea>
                        </div>
                        <div className='mb-2'>
                            {error && <div className="error duration-500 p-2 bg-red-300 text-red-800 text-center text-lg border-red-700 border-2 rounded-md">{error}</div>}
                            {success && <div className="success duration-500 p-2 bg-green-300 text-green-800 text-center text-lg border-green-700 border-2 rounded-md">{success}</div>}
                        </div>
                        <div>
                            <button type="submit" className="bg-[#228e01] w-full max-w-[300px] mx-auto inline-block text-white py-3 text-xl my-6 rounded font-bold">Update blog</button>
                        </div>
                    </form>
                </div>
            </div> : <Loading />}
            {
                error ?
                    <div className='w-full mt-10 pt-10 p-2 md:w-11/12 mx-auto'>
                        <p className='text-center text-red-500 text-2xl'>{error}</p>
                    </div>
                    : ""
            }
        </section>
    )
}

export default EditBlog