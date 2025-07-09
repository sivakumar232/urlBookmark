import { useContext } from 'react'
import Login from './components/Login'
import React from 'react'
import Signup from './components/Signup'
import Landingpage from './components/Landingpage'
import Dashboard from './components/Dashboard'
import {  Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='*'element={<h1>404 page not found</h1>}/>
      <Route path='/'element={<Landingpage/>}/>
      <Route path='/login'element={<Login/>}/>
      <Route path='/signup'element={<Signup/>}/>
    </Routes>
  )
}

export default App
