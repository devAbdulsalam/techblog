import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogLinks, userLinks, menuLinks } from '../Data'
// //hooks
import { useLogout } from '../hooks/useLogout'
// //contexts
import { useAuthContext } from '../context/useAuthContext'
import { NavbarContext } from '../context/NavbarContext'
import Profile from "./Profile";
import userImg from '../assests/avatar-05.png'
// components
import ScrollIndicator from './ScrollIndicator';

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen: open, setIsOpen: setOpen } = useContext(NavbarContext);
  const [isProfile, setIsProfile] = useState(false)
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [searchInput, setSearchInput] = useState('')
  const searchBlog = (query) =>{
    if(!query){
      return
    }
    console.log(query)
    navigate(`/search/${query}`)
  }

  return (
    <nav
      className={`fixed w-full left-0 top-0 z-[999] bg-white shadow-sm`}>
      <div className="flex items-center justify-between lg:px-16 md:py-2">
        <div onClick={() => setOpen(!open)} className={`z-[999]  ${open ? "text-gray-50 invisible" : "text-red-700 visible"} text-3xl md:hidden m-5`}>
          <ion-icon name="menu" size="large"></ion-icon>
        </div>
        <div className="mx-4 md:mx-4 flex justify-between space-x-4">
          <Link to="/" className="text-xl md:text-2xl capitalize font-bold text-red-800">
            Tech<span className="text-red-600">Stuff</span>
          </Link>

          {/* Serach option */}
          <div className="hidden max-w-62 relative md:flex items-stretch over-flow-hidden z-[10] border-gray-50 rounded transition ease-in-out focus:text-gray-700">
            <input
              value={searchInput}
              onInput={(e) => setSearchInput(e.target.value.toLowerCase())}
              type="text"
              className="px-2 py-1 text-base w-80 min-w-[250px] bg-transparent font-normal text-gray-800 bg-clip-padding border-2 border-gray-600 rounded transition ease-in-out m-0"
              placeholder="Search Posts"
            />
            <button
              onClick={() => searchBlog(searchInput)}
              className="btn inline-block absolute top-1 -buttom-2 right-1 px-2  py-1.5 text-black hover:text-blue-500 hover:bg-gray-50 text-xs transition duration-150 ease-in-out "
              type="button"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4 h-4 mb-px"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`text-gray-900 md:block hidden px-7 font-medium  rounded-bl-full`}>
          {user ?
            <div className="flex items-center">
              <Link to="/my-blog" className={`px-4 lg:px-6 font-base text-red-800 hover:text-red-700 lg:font-semibold lg:text-xl white-space-nowrap`}>My Blog</Link>

              <Link to="/create-post" className="lg:text-xl py-1 px-4 lg:p-px-6 font-base text-base text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-300  rounded-md cursor-pointer">
                New<span className="font-semibold ml-px">+</span>
              </Link>

              <div onClick={() => setIsProfile(!isProfile)} className="lg:text-xl p-1 px-2 pl-4 text-red-400 cursor-pointer">
                {user.image ? <img src={userImg} className="w-10 h-10 rounded-full" alt='userimage' ></img > : <img src={userImg} className="w-10 h-10 rounded-full" alt='userimage' ></img >}
              </div>
            </div>
            : ""}
          {!user ?
            <ul className="flex items-center gap-1 py-2 lg:font-semibold lg:text-xl">
              {userLinks?.map((menu, i) => (
                <li key={i} className={`px-4 md:px-2 font-base text-red-800 hover:text-red-700`}>

                  <a href={menu?.link} className="white-space-nowrap">{menu?.name}</a>
                </li>
              ))}
            </ul>
            : ""}
        </div>
        <div onClick={() => setIsProfile(!isProfile)} className={`z-[999]  ${open ? "text-gray-900" : "text-red-700"} text-3xl md:hidden m-5`}>
          <img src={userImg} className="w-10 h-10 rounded-full" alt='userimage' ></img >
        </div>
        <div className={`md:hidden text-gray-900 absolute w-2/3 h-screen px-7 py-2 font-medium bg-white top-0 duration-300 ${open ? "left-0" : "left-[-100%]"}`}>
          {user ?
            <div className="">
              <div className="mt-5">
                <div
                  onClick={() => setOpen(!open)}
                  className={` ${open ? "text-green-900" : "text-green-100"} cursor-pointer text-3xl flex items-center justify-end`}
                >
                  <ion-icon
                    name="close-outline"
                    color="#228e01"
                    size="large"
                  ></ion-icon>
                </div>
                <div className="flex items-center justify-center">
                  {/* <img src={user.img} alt="" className="w-14 h-14 rounded-full" /> */}
                  <div className="p-1 text-green-500">
                    <h5 className="text-lg font-bold">{user?.user?.name}</h5>
                    <p className="text-sm">{user?.user?.email}</p>
                  </div>
                </div>
                <hr className="bg-black" />
              </div>
              <ul className="flex flex-col justify-center h-full space-y-4 py-2 text-lg">
                {blogLinks?.map((menu, i) => (
                  <li
                    onClick={() => setOpen(false)}
                    key={i}
                    className="px-6 hover:text-red-800"
                  >
                    <a href={menu?.link}>{menu?.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            : ""}
          {!user ?
            <div className="mt-5">
              <div
                onClick={() => setOpen(!open)}
                className={` ${open ? "text-green-900" : "text-green-100"} cursor-pointer text-3xl flex items-center justify-end`}
              >
                <ion-icon
                  name="close-outline"
                  color="#228e01"
                  size="large"
                ></ion-icon>
              </div>
              <ul className="flex flex-col justify-center h-full space-y-4 py-2 text-lg">
                {userLinks?.map((menu, i) => (
                  <li
                    onClick={() => setOpen(false)}
                    key={i}
                    className="px-6 hover:text-red-800"
                  >
                    <a href={menu?.link}>{menu?.name}</a>
                  </li>
                ))}
              </ul>
            </div> : ""}
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
            {user ?
              <li className="px-6 hover:text-red-800">
                <button onClick={() => logout()} className="text-lg text-red-600 cursor-pointer">LOGOUT</button>
              </li> : ""}
          </ul>
        </div>
      </div>
      <Profile isProfile={isProfile} />
      <ScrollIndicator />
    </nav >
  );
};

export default Navbar;
