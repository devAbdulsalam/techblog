import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/useAuthContext'
// //pages
import Home from './pages/Home'
import Myblogs from './pages/Myblogs'
import SingleBlog from './pages/SingleBlog'
import CreateBlog from './pages/CreateBlog'
// Login and Signin
import Login from './pages/Login'
import Signup from './pages/Signup'
// component
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="min:h-screen bg-gray-50">
      <BrowserRouter>
        <Navbar />
        <div className='flex gap-2 justify-center px-3 md:px-10 mt-10 lg:w-10/12 mx-auto w-full'>
          <LeftBar />
          {/* Pages */}
          <div className='pages md:w-[80%] lg:w-[60%] w-full mt-8 p-2 rounded-md'>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              >
              </Route>
              <Route
                path="/:id"
                element={<SingleBlog />}
              >
              </Route>
              <Route
                path="/my-post"
                element={<Myblogs />}
              >
              </Route>
              <Route
                path="/create-post"
                element={<CreateBlog />}
              >
              </Route>
              <Route
                path="/signin"
                element={!user ? <Signup /> : <Navigate to='/' />}
              >
              </Route>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to='/' />}
              >
              </Route>
            </Routes>
          </div>
          <RightBar />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
