import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router-dom";
import Router from './Router/Router.jsx';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={Router} />
      <ToastContainer />
    </HelmetProvider>

  </React.StrictMode>
)
