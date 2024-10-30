import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo2.png';
import { AuthContext } from '../auth/authcontext';
import './header.css';

const nav__links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
];

const Header = () => {
  const { logout } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check for token in localStorage to verify login status
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if(token){
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout(); // Logout logic from AuthContext
    localStorage.removeItem('authToken'); // Clear token on logout
    setIsLoggedIn(false); // Update login status
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* LOGO start */}
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            {/* LOGO end */}

            {/* MENU start */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'active__link' : ''
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}

                {isLoggedIn && (
                  <li className="nav__item">
                    <NavLink
                      to="/mytrips"
                      className={(navClass) =>
                        navClass.isActive ? 'active__link' : ''
                      }
                    >
                      My Trips
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
            {/* MENU end */}

            <div className="nav__right d-flex align-items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <Button className="btn primary__btn">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="btn primary__btn">
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button className="btn primary__btn" onClick={handleLogout}>
                    Logout
                  </Button>
                  <div className="menu__icon" onClick={toggleMenu}>
                    <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dropdown menu for profile and logout */}
          {menuOpen && isLoggedIn && (
            <div className="dropdown__menu">
              <Link className="dropdown__item" to="/profile">
                Profile
              </Link>
              <div className="dropdown__item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </Row>
      </Container>
    </header>
  );
};

export default Header;
