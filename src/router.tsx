import { createBrowserRouter, Navigate } from 'react-router-dom'

import { About } from './pages/About/About'
import { Contact } from './pages/Contact/Contact'
import { Ewap } from './pages/Projects/EWAP/EWAP'
import { Banija } from './pages/Projects/Banija/Banija'
import { Login } from './pages/Login/Login'
import { PhotosLayout } from './PhotosLayout'
import { Photos } from './pages/Photos/Photos'
import { Photo } from './pages/Photo/Photo'
import { Fileupload } from './pages/Upload/Upload'
import { Private } from './pages/Protected/Private'
import { Karta } from './maps/karta/Karta'
import { Layout } from './components/Layout/Layout'
import { Home } from './pages/Home/Home'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'projects',
        element: <Navigate to='/projects/banija' />
      },
      {
        path: '3d-scenes',
        element: <Home />
      },
      {
        path: 'projects/banija',
        element: <Banija />
      },
      {
        path: 'projects/ewap',
        element: <Ewap />
      },
      {
        path: 'maps/:signatura',
        element: <Karta />
      },
      {
        path: 'maps',
        element: <Karta />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        element: <PhotosLayout />,
        children: [
          {
            path: 'photos',
            element: <Photos />
          },
          {
            path: 'photos/:signatura',
            element: <Photo />
          }
        ]
      },
      {
        element: <Private />,
        children: [
          {
            path: 'upload',
            element: <Fileupload />
          }
        ]
      }
    ]
  }
])
