import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export const Navbar = () => {

  const { user, exit } = useUser()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to='/' className="navbar-brand">Inicio</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collpase"
          aria-controls='navbarNav'
          data-target="#navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {
          user.login ? (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink to='/employees' className="nav-link">
                    <i className="fa-solid fa-user"> Bienvenido {user.name}</i>
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to='/' className="nav-link" onClick={() => exit()}>
                    <i className="fa-solid fa-user-times"> Salir</i>
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to='/register' className="nav-link">
                    <i className="fa-solid fa-user-plus"> Registrarse</i>
                  </NavLink>
                </li>
              </ul>
            </div>
          )
        }
      </div>
    </nav>
  )
}
