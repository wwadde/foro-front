import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const [userLogged, setUserLogged] = useState(false);

  return (
    <BrowserRouter basename='/foro-front'>
      <div className="d-flex flex-column min-vh-100">
        <div className='container'>
          <Navbar userLogged={userLogged} />
          <main className="container flex-grow-1 py-4">
            <AppRoutes userLogged={userLogged} setUserLogged={setUserLogged} />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}