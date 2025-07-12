import { StrictMode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { Contact } from './pages/Contact/Contact'
import { Ewap } from './pages/Projects/EWAP/EWAP'
import { Banija } from './pages/Projects/Banija/Banija'
import { Fileupload } from './pages/Upload/Upload'
import { Login } from './pages/Login/Login'
import { PhotosLayout } from './PhotosLayout'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Private } from './pages/Protected/Private'
import { Photos } from './pages/Photos/Photos'
import { Photo } from './pages/Photo/Photo'
import { Karta } from './maps/karta/Karta'
import { Layout } from './components/Layout/Layout'
import { store } from './redux/store'
import './index.sass'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/projects',
        element: <Navigate to='/projects/banija' />
      },
      {
        path: '/3d-scenes',
        element: <Home />
      },
      {
        path: '/projects/banija',
        element: <Banija />
      },
      {
        path: '/projects/ewap',
        element: <Ewap />
      },
      {
        path: '/maps/:signatura',
        element: <Karta />
      },
      {
        path: '/maps',
        element: <Karta />
      },
      {
        path: '/photos',
        element: <PhotosLayout />,
        children: [
          {
            index: true,
            element: <Photos />
          },
          {
            path: ':signatura',
            element: <Photo />
          }
        ]
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        element: <Private />,
        children: [
          {
            path: '/upload',
            element: <Fileupload />
          }
        ]
      }
    ]
  }
])

export const App = (): JSX.Element => {
  useEffect(() => {
    console.log('REACT_APP_SERVER_PUB:', import.meta.env.REACT_APP_SERVER_PUB)
  })

  return (
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
