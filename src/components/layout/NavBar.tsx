import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
  userLogged: boolean;
}

export default function Navbar({ userLogged }: NavbarProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Logo</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/forum">Foro</Link>
            </li>
            {!userLogged && (
              <li className="nav-item">
                <Link className="nav-link" to="/registro">Registro</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}