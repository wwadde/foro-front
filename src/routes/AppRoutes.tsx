import { Routes, Route, useSearchParams } from 'react-router-dom';
import Registro from '../components/Registro';
import Home from '../pages/Home';
import Forum from '../pages/Forum';
import Ingreso from '../components/Ingreso';
import { useAuth } from '../context/AuthContext';
import PruebaAutenticacion from '../pages/PruebaAutenticacion';
import Modal from '../components/layout/Modal';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const modal = searchParams.get('modal');
  const handleCloseModal = () => {
    setSearchParams({}); // Elimina el parámetro de la URL
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ingreso" element={<Ingreso />} />
        <Route path="/forum" element={<Forum userLogged={isAuthenticated} />} />
        <Route path="/autenticado" element={<PruebaAutenticacion />} />
      </Routes>
      {/* Cuando llega http://localhost:5173/foro-front?modal=ingreso */}
      {modal === 'ingreso' && (
        <Modal
          showModal={true}
          isLogin={true}
          isRegister={false}
          handleCloseModal={handleCloseModal}
        />
      )}      
      </>
  );
}