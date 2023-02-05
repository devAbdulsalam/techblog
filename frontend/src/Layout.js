import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const Layout = () => {
    return (
        <div className="min:h-screen w-full bg-gray-50">
            <Navbar />
                {/* Pages */}
                <div className='bg-gray-200 w-full mt-8 rounded-md relative'>
                    <Outlet />
                </div>
            <Footer />
        </div>
    )
}

export default Layout