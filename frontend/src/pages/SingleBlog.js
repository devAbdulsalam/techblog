import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext'
import { LoadingContext } from '../context/LoadingContext'
import { BlogContext } from '../context/BlogContext'
import { useBlogs } from '../hooks/useBlogs'
import LeftBar from './../components/LeftBar';
import RightBar from './../components/RightBar';

import userImg from '../assests/avatar-05.png'
// date-fms
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Loading from '../components/Loading'

const SingleBlog = () => {
    const { id } = useParams()
    const { blogs } = useContext(BlogContext);
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [blog, setBlog] = useState(null)
    const [like, setLike] = useState(null)  
    const {likeblog, unlikeblog, deleteblog, success, error} = useBlogs()
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    useEffect(() => {
        if(blogs && blogs.length !== 0){
            let blog = blogs.filter(blog => blog._id === id)
            setBlog(blog[0])
        }                
    }, [blogs, id, setIsLoading])

    // //delete blog
    const handleDelete = () => {
        if (!user) {
            return
        }
        setIsLoading(true)
       deleteblog(id)
    }
    // //update blog
        useEffect(() => {
      const checklikes = blog?.likes.find(like => like === user?.user?._id)
      if(checklikes){
        // console.log('already liked')
        setLike(true)
      }else{
        // console.log('not liked')
        setLike(false)
      }

    }, [blog?.likes, user])
    


    const handleLikes = () => {
        const data = { id:blog?._id, userId:user?.user?._id}
        if(like){
            // console.log("unlikepost")
            // console.log(data)
            unlikeblog(data)
            setLike(false)
        }
        if(!like){
            // console.log("likepost")
            // console.log(data)
            likeblog(data)
            setLike(true)
        }
    }


    return (
        <section id="home" className='flex gap-2 gap-x-3 justify-center px-3 lg:px-5  lg:w-11/12 mx-auto w-full h-full relative'>
          <div className='hidden md:w-[25%] bg-transparent md:inline-flex flex-col mt-10 sticky z-10 top-12 lg:left-10 h-screen'>
              <div className='relative w-full h-screen mt-6'>
                  <LeftBar />
              </div>
          </div>
            {!isLoading ? <div className='w-full mt-10 md:w-11/12 mx-auto'>
                <div className='w-full bg-white md:w-11/12 mx-auto p-2 rounded'>
                    <div className='flex mx-3 my-3'>
                        <Link to={`/${blog?._id}`}>
                            <img src={userImg} className="w-10 h-10 rounded-full" alt='userimage' ></img >
                        </Link>
                        <div className='ml-2'>
                            {blog?.author ? <p className='text-sm font-semibold'>By {blog?.author}</p> : ""}
                            {blog ? < p className='capitalize text-sm'>{formatDistanceToNow(new Date(blog?.createdAt), { addSuffix: true })}</p> : ""}
                        </div>
                    </div>
                    <h1 className="text-2xl pb-px font-bold">{blog?.title}</h1>
                    <h2 className='text-lg pb-1 capitalize font-semibold'>{blog?.subtitle}</h2>
                    <p className='text-lg p-2'>{blog?.content}</p>
                    <div className=''>
                        {error && <div className="error duration-500 my-2 p-2 bg-red-300 text-red-800 text-center text-lg border-red-700 border-2 rounded-md">{error}</div>}
                        {success && <div className="success duration-500 my-2 p-2 bg-green-300 text-green-800 text-center text-lg border-green-700 border-2 rounded-md">{success}</div>}
                    </div>
                    {user && blog?.user_id === user?.user?._id ?
                        <div className='pt-10 pb-2'>
                            <button onClick={() => navigate('/')} className="p-2 bg-green-50 hover:bg-green-100 text-green-500 rounded-md mx-2">
                                <ion-icon name="return-down-back-outline" size="large"></ion-icon>
                            </button>
                            <Link to={`/edit-post/${blog?._id}`} className="p-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-md  mx-2">
                                <ion-icon name="create-outline" size="large"></ion-icon>
                            </Link>
                            <button onClick={handleDelete} className="p-2 bg-gray-50 hover:bg-red-100 text-red-500 rounded-md cursor-pointer mx-3">
                                <ion-icon name="trash" size="large" ></ion-icon>
                            </button>
                        </div>
                        :
                        <div className='pt-10 pb-2 flex'>
                            <button onClick={() => navigate('/')} className="p-2 bg-green-50 hover:bg-green-100 text-green-500 rounded-md mx-2">
                                <ion-icon name="return-down-back-outline" size="large"></ion-icon>
                            </button>
                            <button onClick={handleLikes} className={`${like ? "text-yellow-500" : "text-yellow-200"} pl-4 p-2 cursor-pointer rounded-md`}>
                                <ion-icon name="star" size="large"></ion-icon>
                                <span className='ml-1 text-yellow-500'>{blog?.likes?.length > 0 ? blog?.likes?.length + 1: 0}</span>
                            </button>
                            <button onClick={handleLikes} className="p-2 cursor-pointer bg-gold-500 hover:bg-yellow-100 text-gold-500 rounded-md">
                                <span className='font-semibold'>{blog?.comments.length > 0 ? blog?.comments.length + 1: 0} comments</span>
                            </button>
                        </div>
                    }
                </div>
            </div> : <Loading />
            }
            {
                error ?
                    <div className='w-full mt-10 pt-10 p-2 md:w-11/12 mx-auto'>
                        <p className='text-center text-red-500 text-2xl'>{error}</p>
                    </div>
                    : ""
            }
        <div className='hidden lg:flex lg:w-[25%] bg-transparent flex-col mt-10 sticky z-10 top-12 left-10 h-screen'>
              <div className='relative w-full h-screen mt-6'>
                  <RightBar />
              </div>
          </div>
    </section>
    )
}

export default SingleBlog