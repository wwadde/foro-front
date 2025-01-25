import { useState } from 'react';
import hideIcon from '../assets/hide.png';
import showIcon from '../assets/show.png';
import googleIcon from '../assets/google.png';



export default function Registro() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <form className="row">

            <div className="input-group mb-3 col-12">
                <span className="input-group-text">@</span>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" />
                    <label htmlFor="floatingInputGroup1">Usuario</label>
                </div>
            </div>

            <div className="form-floating mb-3 col-12 position-relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                />
                <label className="mx-2" htmlFor="floatingPassword">Contraseña</label>
                <button
                    type="button"
                    className="position-absolute"
                    style={{ right: '15px', top: '50%', transform: 'translateY(-60%)', border: 'none', background: 'none' }}
                    onClick={togglePasswordVisibility}
                >
                    <img src={showPassword ? hideIcon : showIcon} alt="Toggle visibility" style={{ width: '20px', height: '20px' }} />
                </button>
            </div>

            <div className="form-floating mb-3 col-12 position-relative">
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control"
                    id="floatingConfirmPassword"
                    placeholder="Password"
                />
                <label className="mx-2" htmlFor="floatingConfirmPassword">Confirmar Contraseña</label>
                <button
                    type="button"
                    className="position-absolute"
                    style={{ right: '15px', top: '50%', transform: 'translateY(-60%)', border: 'none', background: 'none' }}
                    onClick={toggleConfirmPasswordVisibility}
                >
                    <img src={showConfirmPassword ? hideIcon : showIcon} alt="Toggle visibility" style={{ width: '20px', height: '20px' }} />
                </button>
            </div>

            <div className="form-floating mb-3 col-12">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="mx-2" htmlFor="floatingInput">Email</label>
            </div>

            <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary">Registrar</button>
            </div>

            <div className="col-12 text-center mt-3">
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
        </form>
    )
}
