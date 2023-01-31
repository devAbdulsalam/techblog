import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'
import userImg from '../assests/avatar-05.png'
import { useAuthContext } from '../context/useAuthContext'
// date-fms
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Blog = ({ blog }) => {
    const { _id, title, userId, createdAt, subtitle, author, content, keywords, likes, comment} = blog    
    const { likeblog, unlikeblog,  commentblog,  uncommentblog} = useBlogs()    
    const { user } = useAuthContext()
    const [like, setLike] = useState(null)
    const [comments, setComments] = useState(null)

    const handleLikes = () => {
        const data = { _id, user:user?.user?._id, userId}

        if(like){
            console.log("unlikepost")
            console.log(likes)
            unlikeblog(data)
            setLike(false)
        }
        if(!like){
            console.log("likepost")
            console.log(likes)
            likeblog(data)
            setLike(true)
        }
    }

    const handleComments = () => {
        console.log(comment)
        if(comments){
            console.log("uncomment")
            uncommentblog()
            setComments(false)
        }
        if(!comments){
            console.log("comment")
            commentblog()
            setComments(true)

        }
    }
    return (
        <div key={_id} className='border-b border-gray-200 bg-white p-3 w-full my-2 rounded '>
            <div className='flex mb-2'>
                <Link to={`/${_id}`}>
                    <img src={userImg} className="w-10 h-10 rounded-full" alt='userimage' ></img >
                </Link>
                <div className='ml-2'>
                    {author ? <p className='text-sm font-semibold'>By {author}</p> : ""}
                    {createdAt ? <p className='capitalize text-sm'>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p> : ''}
                </div>
            </div>
            <Link to={`/${_id}`}>
                <h1 className="text-xl text-red-800 hover:text-red-600 font-bold cursor-pointer uppercase">{title}</h1>
            </Link>
            <h2 className='text-base md:text-lg font-semibold capitalize'>{subtitle}</h2>
            <p className='capitalize text-base py-2 leading-6'>{content?.slice(0, 150)}</p>
            <hr />
            <div className=''>
                <div className=''>
                    {keywords}
                </div>
                <div className='flex gap-2'>
                    {likes ? <button onClick={() => handleLikes} className={`${like ? "text-yellow-500" : "text-yellow-200"} `}>stars <span>1</span></button> : <button onClick={handleLikes} className={`${like ? "text-yellow-500" : "text-yellow-200"}`}><ion-icon name="star"></ion-icon></button>}
                    {comment? <button onClick={() => handleComments}>comments <span>1</span></button>: <button onClick={() => handleComments}>comments</button>}
                    <p>save</p>
                </div>
            </div>
        </div>
    )
}

export default Blog