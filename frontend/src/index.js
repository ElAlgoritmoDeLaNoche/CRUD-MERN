import React from 'react'
import ReactDOM from 'react-dom'
import './css/bootstrap.min.css'
import App from './App'
import UserProvider from './context/UserContext'

// Dependencias npm install sweetalert2 axios react-responsive-modal react-router-dom

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);