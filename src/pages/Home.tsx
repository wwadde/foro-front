import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Registro from '../components/Registro';

export default function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleExplorar = () => {
    navigate('/forum');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className="container py-5">
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button 
          type="button" 
          className="btn btn-primary btn-lg px-4 gap-3"
          onClick={handleExplorar}
        >
          Explorar
        </button>
        <button 
          type="button" 
          className="btn btn-outline-secondary btn-lg px-4"
          onClick={handleOpenModal}
        >
          Registrarse
        </button>
      </div>



      {showModal && (
        <>
          <div 
            className="modal show d-block" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={handleCloseModal}
          >
            <div 
              className="modal-dialog modal-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Registro</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <Registro setUserLogged={() => {
                    handleCloseModal();
                    navigate('/forum');
                  }} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}