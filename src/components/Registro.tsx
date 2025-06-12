import { FormEvent, useState, useRef, useEffect } from 'react';
import hideIcon from '../assets/hide.png';
import showIcon from '../assets/show.png';
import { useNavigate } from 'react-router-dom';
import OTPInput from './Otp';
import { registrarEnviarOTP, validarOTP } from '../services/authentication';
import LoginGoogle from './LoginGoogle';

interface Props {
    handleCloseModal?: () => void;
}


export default function Registro({ handleCloseModal = () => { } }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [datosRegistro, setDatosRegistro] = useState({
        username: '',
        password: '',
        email: ''
    });

    const navigate = useNavigate();

    const getRefValues = () => {
        const username = usernameRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        const confirmPassword = confirmPasswordRef.current?.value || '';
        const email = emailRef.current?.value || '';

        return { username, password, confirmPassword, email };

    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleNextSlide = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const { username, password, confirmPassword, email } = getRefValues();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (!username || !password || !email) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setError('El email no es válido');
            return;
        }

        setIsLoading(true);
        try {
            await registrarEnviarOTP({ username, password, email });
            setDatosRegistro({ username, password, email });
            setActiveSlide(1);
            console.log('Código de verificación enviado a:', email);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al enviar el código de verificación');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerification = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const code = verificationCode.join('');
        const { username, password, email } = getRefValues();
        setIsLoading(true);
        try {
            const isValid = await validarOTP({ username, password, email }, code);
            if (isValid) {
                console.log('Código verificado correctamente');
                navigate('/forum');
                handleCloseModal();
            } else {
                setError('El código de verificación es incorrecto');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al verificar el código');
        } finally {
            setIsLoading(false);
        }
    };



    useEffect(() => {
        if (activeSlide === 0) {
            if (usernameRef.current) usernameRef.current.value = datosRegistro.username;
            if (passwordRef.current) passwordRef.current.value = datosRegistro.password;
            if (confirmPasswordRef.current) confirmPasswordRef.current.value = datosRegistro.password;
            if (emailRef.current) emailRef.current.value = datosRegistro.email;
        }
    }, [activeSlide, datosRegistro]);

    return (
        <div className="carousel">
            {activeSlide === 0 ? (
                <form className="row" onSubmit={handleNextSlide}>
                    <div className="input-group mb-3 col-12">
                        <span className="input-group-text">@</span>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInputGroup1"
                                placeholder="Username"
                                ref={usernameRef}
                                required
                            />
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
                            ref={passwordRef}
                            required
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
                            ref={confirmPasswordRef}
                            required
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
                            ref={emailRef}
                            required
                        />
                        <label className="mx-2" htmlFor="floatingInput">Email</label>
                    </div>

                    {error && <div className="text-danger text-center mb-3">{error}</div>}

                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Enviando...' : 'Siguiente'}
                        </button>
                    </div>

                    <div className="col-12 text-center mt-3">
                    <LoginGoogle onSuccessCloseModal={handleCloseModal} />
                    </div>
                </form>
            ) : (
                <form className="row" onSubmit={handleVerification}>
                    <label className="mb-2 text-center" htmlFor="verificationCode">
                        Se envió un código de verificación al correo suministrado: {emailRef.current?.value}
                    </label>
                    <br />
                    <OTPInput length={6} onChange={setVerificationCode} />
                    {error && <div className="text-danger text-center mb-3">{error}</div>}
                    <div className="col-12 text-center">
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={() => setActiveSlide(0)}
                            disabled={isLoading}
                        >
                            Atrás
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Verificando...' : 'Verificar'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}