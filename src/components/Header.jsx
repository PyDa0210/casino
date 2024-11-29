import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import logo from '../assets/favicon.webp';
import UserInfo from './UserInfo';
import { FaDice } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú

  // Función para alternar el estado del menú
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">
          <img src={logo} alt="Logo" className="header__logo-image" />
          <span className="header__menu-text">
            Bienvenido,&nbsp;<FaDice className="header__dice-icon" />&nbsp;<UserInfo showEmail={false} showBalance={false} />
          </span>
        </Link>

        {/* Botón de hamburguesa */}
        <button className="header__menu-toggle" onClick={toggleMenu}>
          &#9776; {/* Símbolo de hamburguesa */}
        </button>

        {/* Menú de navegación */}
        <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="header__menu">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/bet">Apuestas</Link>
            </li>
            <li>
              <Link to="/account">Cuenta</Link>
            </li>
            <li>
              <Link to="/adminBalance">Balance</Link>
            </li>
            <li>
              <Link to="/login">Cerrar Sesión</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
