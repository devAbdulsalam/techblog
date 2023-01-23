import React from 'react'
import { Link } from 'react-router-dom'
import userImg from '../assests/avatar-05.png'
import { useAuthContext } from '../context/useAuthContext'

const RightBar = () => {
    const { user } = useAuthContext()
    return (
        <div className='hidden w-[20%] h-full bg-white lg:inline-block shadow-md mt-10 rounded'>
            <div className='rounded p-2 shadow-md'>
                <div className='flex justify-center'>
                    <img src={user?.user?.user?.pic || userImg} className="w-20 h-20 rounded-full" alt='userimage' />
                </div>
                <div className='p-2 space-y-2'>
                    <h1 className='text-xl font-semibold'>{user?.user?.name}</h1>
                    <h2><Link to="/">Project Manager, Developer</Link></h2>
                    <h2><Link to="/">Work: StemLabNG</Link></h2>
                    <hr />
                    <p><Link to="/my-blog">Posts : {user?.blog?.length || 0}</Link></p>
                    <p><Link to="/">Drafts: 8</Link></p>
                    <h2><Link to="/">Status: legend</Link></h2>
                    <h2><Link to="/">Joined: 2000</Link></h2>
                    <h2 className='bg-blue-600 hover:bg-blue-400 py-2 border rounded-md w-full text-center text-white'><Link to="/">Follow</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default RightBar