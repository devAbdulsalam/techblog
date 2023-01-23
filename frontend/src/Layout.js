import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import Footer from './components/Footer';
import Loading from './components/Loading';
const Layout = () => {
    return (
        <div className="min:h-screen bg-gray-50">
            <Navbar />
            <div className='flex gap-2 justify-center px-3 md:px-10 mt-10 lg:w-10/12 mx-auto w-full'>
                <LeftBar />
                {/* Pages */}
                <div className='bg-gray-200 md:w-[80%] lg:w-[60%] w-full mt-8 p-2 rounded-md relative'>
                    <Loading />
                    <Outlet />
                </div>
                <RightBar />
            </div>
            <Footer />
        </div>
    )
}

export default Layout