import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import Footer from './components/Footer';
const Layout = () => {
    return (
        <div className="min:h-screen bg-gray-50">
            <Navbar />
            <div className='flex gap-2 gap-x-3 justify-center px-3 lg:px-5 mt-10 lg:w-10/12 mx-auto w-full h-full relative'>
                <div className='hidden md:w-[25%] bg-transparent md:inline-flex flex-col mt-10 sticky z-10 top-12 lg:left-10 h-screen'>
                    <div className='relative w-full h-screen mt-6'>
                        <LeftBar />
                    </div>
                </div>
                {/* Pages */}
                <div className='bg-gray-200 md:w-[70%] lg:w-[50%]  w-full mt-8 p-2 rounded-md relative'>
                    <Outlet />
                </div>
                <div className='hidden lg:flex lg:w-[25%] bg-transparent flex-col mt-10 sticky z-10 top-12 left-10 h-screen'>
                    <div className='relative w-full h-screen mt-6'>
                        <RightBar />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout