import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import Layout from './Layout';
import ProtectedRoutes from './components/ProtectedRoutes';



function App() {
  const { user } = useAuthContext()
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<ProtectedRoutes />}>
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
        </Route>
        <Route
          path="/"
          element={<Home />}
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
      </Route>
    </Routes>
  );
}

export default App;