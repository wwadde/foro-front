import { FormEvent, useState } from 'react';
import hideIcon from '../assets/hide.png';
import showIcon from '../assets/show.png';
import googleIcon from '../assets/google.png';
import { useNavigate } from 'react-router-dom';
import OTPInput from './Otp';
import { useAuth } from '../context/AuthContext';


export default function Registro() {
    const { setUserLogged } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState(Array(8).fill(''));

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleNextSlide = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setActiveSlide(1);
        // Here you would trigger email verification code
        console.log('Sending verification code to:', email);
    };

    const handleVerification = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO conectar al servidor

        const code = verificationCode.join('');
        console.log('Verifying code:', code);
        // Verify code logic here
        setUserLogged(true);
        navigate('/forum');
    };

    return (
        <div className="carousel">
            {activeSlide === 0 ? (
                <form className="row" onSubmit={handleNextSlide}>
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
                            autoComplete="new-password"
                            name="new-password"
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
                            autoComplete="new-password"
                            name="new-password"
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
                        <input 
                            type="email" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        <label className="mx-2" htmlFor="floatingInput">Email</label>
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary">Siguiente</button>
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
            ) : (
                <form className="row" onSubmit={handleVerification}>
                    <label className="mb-2 text-center" htmlFor="verificationCode">Se envió un código de verificación al correo suministrado: {email}</label>
                    <br />
                    <OTPInput length={8} onChange={setVerificationCode} />
                    <div className="col-12 text-center">
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={() => setActiveSlide(0)}
                        >
                            Atrás
                        </button>
                        {/* Enviar el codigo OTP al servidor para verificar */}
                        <button type="submit" className="btn btn-primary">
                            Verificar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}