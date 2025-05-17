import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Modal';
import ballenaLogo from '../../assets/ballena.png';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
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

  async function prueba() {
    const response = await fetch('http://localhost:8080/foro/autenticar/prueba', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',        
      },
      credentials: 'include',
      
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Response:', data);
    } else {
      console.error('Error:', response.statusText);
    }
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/">
            <img
              src={ballenaLogo}
              alt='Logo ballena'
              style={{ width: '75px', height: '50px' }} />
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
              {!isAuthenticated && (
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleShowModal('login')}>Ingresar</button>
                </li>
              )}
              {!isAuthenticated && (
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleShowModal('register')}>Registro</button>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <button className="nav-link btn text-danger" onClick={logout}>Logout</button>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <button className="nav-link btn text-danger" onClick={prueba}>PRUEBA SPRING CONTEXT</button>
                </li>
              )}
            </ul>
          </div>
          {isAuthenticated && (
            <Link className="nav-link me-5" to="/profile" >Perfil</Link>
          )}
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