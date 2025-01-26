import { Routes, Route } from 'react-router-dom';
import Registro from '../components/Registro';
import Home from '../pages/Home';
import Forum from '../pages/Forum';



interface AppRoutesProps {
    userLogged: boolean;
    setUserLogged: (value: boolean) => void;
}

export default function AppRoutes({ userLogged, setUserLogged }: AppRoutesProps) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro setUserLogged={setUserLogged} />} />
            <Route path="/forum" element={<Forum userLogged={userLogged} />} />
        </Routes>
    );
}