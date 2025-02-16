import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Modal';
import ballenaLogo from '../../assets/ballena.png';



interface NavbarProps {
  userLogged: boolean;
}

export default function Navbar({ userLogged }: NavbarProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-between align-items-center">
        <Link to="/">
            <img 
            src={ballenaLogo}
            alt='Logo ballena'
            style={{ width: '75px', height: '50px' }}  />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavCollapse}
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-center`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forum">Foro</Link>
              </li>
              {!userLogged && (
                <li className="nav-item">
                  <button className="nav-link btn" onClick={handleShowModal}>Registro</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Modal showModal={showModal} handleCloseModal={handleCloseModal} />
    </>
  );
}