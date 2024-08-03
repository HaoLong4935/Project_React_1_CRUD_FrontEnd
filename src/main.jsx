import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './global/reset.css'
import UserPage from './Pages/user.jsx';
import ErrorPage from './Pages/error.jsx';
import Register from './Pages/register.jsx';
import Login from './Pages/login.jsx';
import { AuthWrapper } from './components/context/auth.contex.jsx';
import PrivateRoute from './Pages/private.route.jsx';
import BookTable from './components/books/book.table.jsx';
import Book from './components/books/book.jsx';
import '../node_modules/nprogress/nprogress.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users",
        element: <UserPage />
      },
      {
        path: "books",
        element: (
          <PrivateRoute>
            <Book />
          </PrivateRoute>
        )
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </React.StrictMode>,
)
