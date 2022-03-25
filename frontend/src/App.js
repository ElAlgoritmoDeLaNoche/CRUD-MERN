import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Navbar } from './components/Navbar'
import { Employees } from './components/Employees'
import axios from 'axios'
import { useUser } from './context/UserContext'

axios.defaults.baseURL = 'http://localhost:4000/api'

function App() {

  const { user } = useUser()
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

  const Public = ({ children }) => {
    return !user.login ? children : <Navigate to='/employees' />
  }

  const Private = ({ children }) => {
    return user.login ? children : <Navigate to='/' />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Public><Login /></Public>} />
        <Route path='/register' element={<Public><Register /></Public>} />
        <Route path='/employees' element={<Private><Employees /></Private>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
