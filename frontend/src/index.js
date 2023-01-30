import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoadingProvider from './context/LoadingContext';
import BlogProvider from './context/BlogContext';
import AuthContextProvider from './context/AuthContext';
import NavbarContext from './context/NavbarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <NavbarContext>
            <BlogProvider>
              <AuthContextProvider>
                <Routes>
                  <Route path='/*' element={<App />}>
                  </Route>
                </Routes>
              </AuthContextProvider>
            </BlogProvider>
        </NavbarContext>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);