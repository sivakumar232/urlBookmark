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
import { BookmarkProvider } from './context/BookmarkContext';

function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} 
          />
          <Route path='/recent' element={
            <ProtectedRoute>
              <Recent />
            </ProtectedRoute>} 
          />
          <Route path='*' element={<h1>404 page not found</h1>} />
        </Routes>
      </BookmarkProvider>
    </ThemeProvider>
  )
}


export default App;
