import React from 'react'
import { Link } from 'react-router-dom'

import userImg from '../assests/avatar-05.png'
// date-fms
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Blog = ({ blog }) => {
    const { _id, title, createdAt, subtitle, author, content, keywords } = blog
    return (
        <div key={_id} className='border-b border-gray-200 bg-white p-3 w-full my-2 rounded '>
            <div className='flex mb-2'>
                <Link to={`/${_id}`}>
                    <img src={userImg} className="w-10 h-10 rounded-full" alt='userimage' ></img >
                </Link>
                <div className='ml-2'>
                    {author ? <p className='text-sm font-semibold'>By {author}</p> : ""}
                    <p className='capitalize text-sm'>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
                </div>
            </div>
            <Link to={`/${_id}`}>
                <h1 className="text-xl text-red-800 hover:text-red-600 font-bold cursor-pointer uppercase">{title}</h1>
            </Link>
            <h2 className='text-base md:text-lg font-semibold capitalize'>{subtitle}</h2>
            <p className='capitalize text-base py-2 leading-6'>{content.slice(0, 150)}</p>
            <hr />
            <div className=''>
                <div className=''>
                    {keywords}
                </div>
                <div className='flex gap-2'>
                    <p className=''>stars</p>
                    <p>comments</p>
                    <p>save</p>
                </div>
            </div>
        </div>
    )
}

export default Blog