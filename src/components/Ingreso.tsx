import { useState, useRef } from 'react';
import { login } from '../services/authentication';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginGoogle from './LoginGoogle';

interface Props {
  handleCloseModal?: () => void;
}

export default function Ingreso({ handleCloseModal = () => {} }: Props) {
  const { setToken } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    if (!username || !password) {
      setError('El usuario y la contraseña son obligatorios');
      setLoading(false);
      return;
    }
    
    try {
      const respuesta = await login({ username, password });
      setToken(respuesta.jwToken.replace('Bearer ', ''));
      console.log(respuesta.jwToken);
      navigate('/forum');
      handleCloseModal();
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
        
        <LoginGoogle onSuccessCloseModal={handleCloseModal}/>

        <div className="input-group mb-3 col-12">
          <span className="input-group-text">@</span>
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control" 
              id="floatingInputGroup1" 
              placeholder="Username" 
              ref={usernameRef}
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
            ref={passwordRef}
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