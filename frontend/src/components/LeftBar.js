import React from 'react'
import { userLinks, blogLinks, menuLinks } from '../Data'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext'

const LeftBar = () => {

    const { user } = useAuthContext()
    return (
        <div className='hidden md:w-[18%] lg:w-[20%] bg-white md:inline-flex flex-col mt-10 shadow-md h-full rounded'>
            <div className='p-2'>
                <h1 className='text-2xl font-semibold text-center'>Tech Stuff</h1>
                <p>lorem lorem lorem lorem</p>
                <p>lorem lorem lorem lorem</p>
            </div>
            {!user ?
                <ul className="flex items-center flex-col gap-1 py-2 lg:font-semibold lg:text-lg">
                    {userLinks?.map((menu, i) => (
                        <li key={i} className={`font-base w-full text-center text-red-800 hover:text-red-700 py-1 hover:bg-gray-50`}>
                            <a href={menu?.link} className="white-space-nowrap">{menu?.name}</a>m-
                        </li>
                    ))}
                </ul>
                :
                <div className="flex items-center flex-col gap-1 py-2 lg:font-semibold lg:text-lg">
                    {blogLinks?.map((menu, i) => (
                        <Link to={menu?.link} key={i} className={`font-base w-full text-center text-red-800 hover:text-red-700 py-1 hover:bg-gray-50`}>{menu?.name}</Link>
                    ))}
                    <ul className='mt-10 w-full'>
                        {menuLinks?.map((menu, i) => (
                            <li key={i} className={`font-base px-2 flex items-center space-x-3 w-full text-center text-red-800 hover:text-red-700 py-1 hover:bg-gray-50`}>
                                <ion-icon
                                    name={menu.icon}
                                    size="large"
                                    className="m-2"
                                ></ion-icon><a href={menu?.link} className="white-space-nowrap">{menu?.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

export default LeftBar