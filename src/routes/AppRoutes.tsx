import { Routes, Route } from 'react-router-dom';
import Registro from '../components/Registro';
import Home from '../pages/Home';
import Forum from '../pages/Forum';
import Ingreso from '../components/Ingreso';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { userLogged } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/ingreso" element={<Ingreso />} />
      <Route path="/forum" element={<Forum userLogged={userLogged} />} />
    </Routes>
  );
}