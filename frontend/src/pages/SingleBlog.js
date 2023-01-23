import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import EditBlog from './EditBlog'
import { useAuthContext } from '../context/useAuthContext'
import { LoadingContext } from '../context/LoadingContext'
import { EditContext } from '../context/EditContext'

import userImg from '../assests/avatar-05.png'
// date-fms
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import axios from 'axios'

const SingleBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [blog, setBlog] = useState(null)
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { setIsEdit } = useContext(EditContext);
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`http://localhost:4000/blogs/${id}`)
            .then((res) => {
                setIsLoading(false)
                setBlog(res.data)
            })
            .catch((err) => {
                setError(err.message)
                console.log(err.message)
            })
    }, [id, setIsLoading])

    // //delete blog
    const handleDelete = () => {
        if (!user) {
            return
        }
        setIsLoading(true)
        axios.delete(`http://localhost:4000/blogs/${id}`, { headers: { 'Authorization': `Bearer ${user.token}` } })
            .then((res) => {
                console.log(res.data)
                setIsLoading(false)
                navigate('/')
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err.message)
            })
    }
    // //update blog
    const handleEdit = () => {
        setIsEdit(true)

    }
    // //update blog
    const handleRating = () => {
        console.log("star")

    }
    const likes = 900

    return (
        <section className="min-h-screen flex flex-col items-center">
            {!isLoading ? <div className='w-full mt-10 md:w-11/12 mx-auto'>
                <div className='w-full bg-white md:w-11/12 mx-auto p-2 rounded'>
                    <div className='flex mx-3 my-3'>
                        <Link to={`/${blog?._id}`}>
                            <img src={userImg} className="w-10 h-10 rounded-full" alt='userimage' ></img >
                        </Link>
                        <div className='ml-2'>
                            {blog?.author ? <p className='text-sm font-semibold'>By {blog?.author}</p> : ""}
                            {blog ? < p className='capitalize text-sm'>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</p> : ""}
                        </div>
                    </div>
                    <h1 className="text-2xl pb-px font-bold">{blog?.title}</h1>
                    <h2 className='text-lg pb-1 capitalize font-semibold'>{blog?.subtitle}</h2>
                    <p className='text-lg p-2'>{blog?.content}</p>
                    {user && blog?.user_id ?
                        <div className='pt-10 pb-2'>
                            <button onClick={() => navigate(-1)} className="p-2 bg-green-50 hover:bg-green-100 text-green-500 rounded-md mx-2">
                                <ion-icon name="return-down-back-outline" size="large"></ion-icon>
                            </button>
                            <button onClick={handleEdit} className="p-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-md  mx-2">
                                <ion-icon name="create-outline" size="large"></ion-icon>
                            </button>
                            <button onClick={handleDelete} className="p-2 bg-gray-50 hover:bg-red-100 text-red-500 rounded-md cursor-pointer mx-3">
                                <ion-icon name="trash" size="large" ></ion-icon>
                            </button>
                        </div>
                        :
                        <div className='pt-10 pb-2 flex'>
                            <button onClick={() => navigate(-1)} className="p-2 bg-green-50 hover:bg-green-100 text-green-500 rounded-md mx-2">
                                <ion-icon name="return-down-back-outline" size="large"></ion-icon>
                            </button>
                            <button onClick={handleRating} className="pl-4 p-2 cursor-pointer bg-gold-500 hover:bg-yellow-100 text-gold-500 rounded-md">
                                <ion-icon name="star-outline" size="large"></ion-icon>
                                <span className='ml-1 text-yellow-500'>{likes || "700"}</span>
                            </button>
                            <button onClick={handleRating} className="p-2 cursor-pointer bg-gold-500 hover:bg-yellow-100 text-gold-500 rounded-md">
                                <span className='font-semibold'>90 </span>comments
                            </button>
                        </div>
                    }
                </div>
            </div> : ''
            }
            {
                error ?
                    <div className='w-full mt-10 pt-10 p-2 md:w-11/12 mx-auto'>
                        <p className='text-center text-red-500 text-2xl'>{error}</p>
                    </div>
                    : ""
            }
            {blog ? <EditBlog blog={blog} /> : ''}
        </section >
    )
}

export default SingleBlog