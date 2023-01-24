import React from 'react'
import { userLinks, blogLinks, menuLinks } from '../Data'
import { useAuthContext } from '../context/useAuthContext'

const LeftBar = () => {

    const { user } = useAuthContext()
    return (
        <div className='hidden w-full bg-transparent md:flex flex-col sticky top-0 right-0 h-full'>
            <div className='p-2'>
                <h1 className='text-2xl font-semibold text-center'>Tech Stuff</h1>
                <p>lorem lorem lorem lorem</p>
                <p>lorem lorem lorem lorem</p>
            </div>
            {!user ?
                <ul className="flex items-center flex-col gap-1 py-2 lg:font-semibold lg:text-lg">
                    {userLinks?.map((menu, i) => (
                        <li key={i} className={`font-base px-2 flex items-center space-x-3 w-full text-center text-red-800 hover:text-red-700 py-1 hover:bg-gray-200`}>
                            <ion-icon
                                name={menu.icon}
                                size="large"
                                className="m-2"
                            ></ion-icon><a href={menu?.link} className="white-space-nowrap">{menu?.name}</a>
                        </li>
                    ))}
                </ul>
                :
                <div className="flex items-center flex-col py-2 lg:font-semibold lg:text-lg">
                    {blogLinks?.map((menu, i) => (
                        <li key={i} className={`font-base px-2 flex items-center space-x-3 w-full text-center text-red-800 hover:text-red-700 py-1 hover:bg-gray-200`}>
                            <ion-icon
                                name={menu.icon}
                                size="large"
                                className="m-2"
                            ></ion-icon><a href={menu?.link} className="white-space-nowrap">{menu?.name}</a>
                        </li>
                    ))}
                    <ul className='mt-5 w-full'>
                        {menuLinks?.map((menu, i) => (
                            <li key={i} className={`font-base px-2 flex items-center space-x-3 w-full text-center text-red-800 hover:text-red-700 py-1 hover:bg-gray-200`}>
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