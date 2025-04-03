import { useState } from 'react';
import googleIcon from '../assets/google.png';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Ingreso() {
  const { setUserLogged } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await login({ username, password });
      console.log('Login successful:', response);
      setUserLogged(true);
    } catch (ex) {
      if (ex instanceof Error) {
        setError(ex.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="carousel">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-12 text-center mb-3">
          <button 
            type="button" 
            className="btn btn-light border d-flex align-items-center mx-auto"
            onClick={() => console.log('Google login')}
          >
            <img 
              src={googleIcon} 
              alt="Google" 
              style={{ width: '24px', height: '24px', marginRight: '8px' }} 
            />
            Continuar con Google
          </button>
        </div>

        <div className="input-group mb-3 col-12">
          <span className="input-group-text">@</span>
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control" 
              id="floatingInputGroup1" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInputGroup1">Usuario</label>
          </div>
        </div>

        <div className="form-floating mb-3 col-12 position-relative">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            autoComplete="new-password"
            name="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="mx-2" htmlFor="floatingPassword">Contraseña</label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Ingresar
          </button>
        </div>

        {error && <div className="text-danger text-center mt-3">{error}</div>}
      </form>
    </div>
  );
}