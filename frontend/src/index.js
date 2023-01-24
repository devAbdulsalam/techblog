import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoadingProvider from './context/LoadingContext';
import BlogProvider from './context/BlogContext';
import AuthContextProvider from './context/AuthContext';
import NavbarContext from './context/NavbarContext';
import EditContextProvider from './context/EditContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <NavbarContext>
          <EditContextProvider>
            <BlogProvider>
              <AuthContextProvider>
                <Routes>
                  <Route path='/*' element={<App />}>
                  </Route>
                </Routes>
              </AuthContextProvider>
            </BlogProvider>
          </EditContextProvider>
        </NavbarContext>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);