import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
     return (
          <header>
               <nav className="header__nav">
                    <div className="header__toggler">Hamburger 30% width</div>
                    <ul className="header__navlist">
                         <li><Link to="/">Home</Link></li>
                         <li><Link to="/scores">Highscore</Link></li>
                         <li><Link to="/about">About</Link></li>
                    </ul>
               </nav>
          </header>
     )
}

export default Header
