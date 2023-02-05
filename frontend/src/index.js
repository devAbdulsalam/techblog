import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoadingProvider from './context/LoadingContext';
import BlogProvider from './context/BlogContext';
import AuthContextProvider from './context/AuthContext';
import NavbarContext from './context/NavbarContext';
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <LoadingProvider>
        <NavbarContext>
            <BlogProvider>
              <AuthContextProvider>
                <App />
              </AuthContextProvider>
            </BlogProvider>
        </NavbarContext>
      </LoadingProvider>
  </React.StrictMode>
);