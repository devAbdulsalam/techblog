import React from 'react'
// //hooks
import { useLogout } from '../hooks/useLogout'
// //contexts
import { useAuthContext } from '../context/useAuthContext'

import userImg from '../assests/avatar-05.png'

const Profile = ({ isProfile }) => {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  return (
    <div className={`${isProfile ? 'flex' : 'hidden'} right-0 top-[70px] absolute rounded-md mr-2 bg-white z-[995] transition-all duration-300  place-items-center`}>
      {user ?
        <div className='p-2'>
          <div className='flex justify-center'>
              <img src={user?.user?.user?.pic || userImg} className="w-16 h-16 rounded-full" alt='userimage' />
          </div>
          <h1 className='text-xl text-center font-semibold'>{user?.user?.name}</h1>
          <hr />
          <h1 className='text-lg'>{user?.user?.email || "musa@gmail.com"}</h1>
          <h1 className='text-lg'>{user?.user?.phone}</h1>
          <h1 className='text-lg'><a href={`/profile/${user?.user?._id}`}>View profile</a></h1>
          <div className='p-1 mt-2'>
            <button onClick={() => logout()} className="text-lg lg:text-xl text-red-400 cursor-pointer">Logout</button>
          </div>
        </div> : ''}
    </div>
  )
}

export default Profile