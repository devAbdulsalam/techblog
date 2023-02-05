import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/useAuthContext'
// //pages
import Home from './pages/Home'
import Myblogs from './pages/Myblogs'
import SingleBlog from './pages/SingleBlog'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
// profile
import Profile from './pages/profile/Profile';
import Setting from './pages/Setting';
// drafts
import Draft from './pages/drafts/Draft'
import EditDraft from './pages/drafts/EditDraft'
// Login and Signin
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
// component
import Layout from './Layout';
import ProtectedRoutes from './components/ProtectedRoutes';
import Search from './pages/Search';



function App() {
  const { user } = useAuthContext()
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<ProtectedRoutes />}>

          <Route
            path="/edit-post/:id"
            element={<EditBlog />}
          />
          <Route
            path="/:id"
            element={<SingleBlog />}
          />
          <Route
            path="/my-post"
            element={<Myblogs />}
          />
          <Route
            path="/create-post"
            element={<CreateBlog />}
          />
          <Route
            path="/Setting"
            element={<Setting />}
          />
          <Route
            path="/draft"
            element={<Draft />}
          />
          <Route
            path="/draft/:id"
            element={<EditDraft />}
          />
          <Route
            path="/profile/:id"
            element={<Profile />}
          />
        </Route>
        <Route
          path="/"
          element={<Home />}
        >
        </Route>
        <Route
          path="/search/:query"
          element={<Search />}
        />
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
        <Route
          path="/forget-password"
          element={!user ? <ForgetPassword /> : <Navigate to='/' />}
        >
        </Route>
        <Route
          path="/reset-password/:id/:token"
          element={!user ? <ResetPassword /> : <Navigate to='/' />}
        >
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
