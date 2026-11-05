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
import { ThreeDScenes } from './pages/ThreeDScenes/ThreeDScenes'
import { Essays } from './pages/Essays/Essays'
import { Zemljiste } from './pages/Essays/Zemljiste'
import { Spomenici } from './pages/Essays/Spomenici'
import { Krajobraz } from './pages/Essays/Krajobraz'

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
        element: <ThreeDScenes />
      },
      {
        path: 'essays',
        element: <Essays />
      },
      {
        path: 'essays/poljoprivredno-koristenje-zemljista',
        element: <Zemljiste />
      },
      {
        path: 'essays/analiza-krajobraza',
        element: <Krajobraz />
      },
      {
        path: 'essays/spomenicka-bastina-nob',
        element: <Spomenici />
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
        path: 'maps',
        element: <Karta />,
        children: [
          {
            path: ':photoId',
            element: <Karta />
          }
        ]
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
            path: 'photos/:photoId',
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
