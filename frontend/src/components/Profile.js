import React from 'react'
// //hooks
import { useLogout } from '../hooks/useLogout'
// //contexts
import { useAuthContext } from '../context/useAuthContext'

const Profile = ({ isProfile }) => {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  return (
    <div className={`${isProfile ? 'flex' : 'hidden'} right-0 top-[70px] absolute rounded-md mr-2 bg-white z-[995] transition-all duration-300  place-items-center`}>
      {user ?
        <div className='p-2'>
          <h1>{user.user.user?.pic}</h1>
          <ion-icon name="person-circle-outline" size="large"></ion-icon>
          <h1 className='text-xl font-semibold'>{user.user.name}</h1>
          <hr />
          <h1 className='text-lg'>{user.user.email || "musa@gmail.com"}</h1>
          <h1 className='text-lg'>{user.user.phone}</h1>
          <button onClick={() => logout()} className="text-xl lg:text-2xl text-red-400 cursor-pointer">Logout</button>
        </div> : ''}
    </div>
  )
}

export default Profile