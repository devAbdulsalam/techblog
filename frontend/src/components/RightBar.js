import React from 'react'
import { Link } from 'react-router-dom'
import userImg from '../assests/avatar-05.png'
import { useAuthContext } from '../context/useAuthContext'

const RightBar = () => {
    const { user } = useAuthContext()
    console.log(user?.user)
    return (
        <div className='hidden w-[20%] h-full bg-white lg:inline-block shadow-md mt-10 rounded'>
            <div className='rounded p-2 shadow-md'>
                <div className='flex justify-center'>
                    <img src={user?.user.user?.pic || userImg} className="w-20 h-20 rounded-full" alt='userimage' />
                </div>
                <div className='p-2'>
                    <h1 className='text-xl font-semibold'>{user?.user.name}</h1>
                    <hr />
                    <h2>Posts : 400</h2>
                    <Link to="/">Drafts: 8</Link>
                    <h2>Barge: legend</h2>
                </div>
            </div>
        </div>
    )
}

export default RightBar