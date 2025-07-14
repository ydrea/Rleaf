import { StrictMode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { store } from './redux/store'
import { router } from './router'
import './index.sass'

export const App = () => {
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
