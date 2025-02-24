import { useNavigate } from 'react-router-dom';
import Registro from '../Registro';
import Ingreso from '../Ingreso';

interface ModalProps {
    showModal: boolean;
    handleCloseModal: () => void;
    isLogin?: boolean;
    isRegister?: boolean;
}

export default function Modal({ showModal, handleCloseModal, isLogin, isRegister }: ModalProps) {
    const navigate = useNavigate();

    return (
        <>
            {showModal && isRegister && (
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
            )}

            {showModal && isLogin && (
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
                                <h5 className="modal-title">Ingreso</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <Ingreso />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
        
    );
}