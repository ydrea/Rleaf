import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { store } from './redux/store'
import { router } from './router'
import './index.sass'

export const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
