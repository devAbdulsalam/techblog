import React, { useState, useEffect} from 'react'
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
    
    useEffect(() => {
      const checklikes = likes.find(like => like === user?.user?._id)
      if(checklikes){
        // console.log('already liked')
        setLike(true)
      }else{
        // console.log('not liked')
        setLike(false)
      }

    }, [likes, user])
    


    const handleLikes = () => {
        const data = { id:_id, userId:user?.user?._id}
        if(like){
            console.log("unlikepost")
            console.log(data)
            unlikeblog(data)
            setLike(false)
        }
        if(!like){
            console.log("likepost")
            console.log(data)
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
                <Link to={`/profile/${userId}`}>
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
                    
                        <button onClick={handleLikes} className={`${like ? "text-yellow-500" : "text-yellow-200"} `}>
                            <ion-icon name="star"></ion-icon>
                            <span>{likes.length > 0 ? likes.length + 1: 0} </span>
                        </button>
                    {comment? <button onClick={() => handleComments}>comments <span>1</span></button>: <button onClick={() => handleComments}>comments</button>}
                    <p>save</p>
                </div>
            </div>
        </div>
    )
}

export default Blog