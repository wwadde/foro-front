import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthProvider';


export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter basename='/foro-front'>
        <div className="d-flex flex-column min-vh-100">
          <div className='container'>
            <Navbar />
            <main className="container flex-grow-1 py-4">
              <AppRoutes />
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}