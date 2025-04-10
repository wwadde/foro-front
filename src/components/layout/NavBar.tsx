import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Modal';
import ballenaLogo from '../../assets/ballena.png';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { userLogged } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const handleShowModal = (type: 'login' | 'register') => {
    setModalType(type);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
  };

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
                  <button className="nav-link btn" onClick={() => handleShowModal('login')}>Ingresar</button>
                </li>
              )}
              {!userLogged && (
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleShowModal('register')}>Registro</button>
                </li>
              )}
              {userLogged && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Perfil</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Modal 
        showModal={showModal} 
        handleCloseModal={handleCloseModal} 
        isLogin={modalType === 'login'} 
        isRegister={modalType === 'register'} 
      />
    </>
  );
}