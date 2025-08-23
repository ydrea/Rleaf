import { Outlet, useLocation } from 'react-router'
import { useEffect, useRef } from 'react'

import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'

export const Layout = () => {
  const location = useLocation()
  const previousLocation = useRef(location.pathname)

  useEffect(() => {
    if (previousLocation.current !== location.pathname) {
      if (!location.pathname.includes('photos')) {
        window.scrollTo(0, 0)
      }
      previousLocation.current = location.pathname
    }
  }, [location.pathname])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
