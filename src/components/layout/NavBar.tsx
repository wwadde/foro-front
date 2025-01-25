import { Link } from 'react-router-dom';

interface NavbarProps {
  userLogged: boolean;
}

export default function Navbar({ userLogged }: NavbarProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Logo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            {!userLogged ? (
              <li className="nav-item">
                <Link className="nav-link" to="/registro">Registro</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/forum">Foro</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}