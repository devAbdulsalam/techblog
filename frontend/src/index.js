import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoadingProvider from './context/LoadingContext';
import EditProvider from './context/EditContext';
import BlogProvider from './context/BlogContext';
import AuthContextProvider from './context/AuthContext';
import NavbarContext from './context/NavbarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <NavbarContext>
        <EditProvider>
          <BlogProvider>
            <BrowserRouter>
              <AuthContextProvider>
                <Routes>
                  <Route path='/*' element={<App />}>
                  </Route>
                </Routes>
              </AuthContextProvider>
            </BrowserRouter>
          </BlogProvider>
        </EditProvider>
      </NavbarContext>
    </LoadingProvider>
  </React.StrictMode>
);