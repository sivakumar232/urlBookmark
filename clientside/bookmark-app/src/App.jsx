import { useContext } from 'react'
import Login from './components/Login'
import React from 'react'
import Signup from './components/Signup'
import Landingpage from './components/Landingpage'
import Dashboard from './components/Dashboard'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Recent from './components/Recent'
import { ThemeProvider } from './context/Themecontext'
function App() {
  return (
    <ThemeProvider>
    <Routes>

      <Route path='/' element={<Landingpage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>}></Route>
            <Route path='/recent' element={<ProtectedRoute>
        <Recent/>
      </ProtectedRoute>}></Route>

      <Route path='*' element={<h1>404 page not found</h1>} />
 
    </Routes>
    </ThemeProvider>
  )
}

export default App;
