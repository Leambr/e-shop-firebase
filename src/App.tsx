import { RouterProvider } from 'react-router-dom'
import './App.css'
import { routes } from './core/routing/routes'
import { AuthContextProvider } from './context/AuthContext' 

function App() {

  return (
    <AuthContextProvider>
      <RouterProvider router={routes} />
    </AuthContextProvider>
  )
}

export default App