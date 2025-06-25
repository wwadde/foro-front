import googleIcon from '../assets/google.png';
import { useAuth } from '../context/AuthContext';
import { BASE_URL, GOOGLEAUTH_URL } from '../utils/ApiConstants';


interface Props {
    onSuccessCloseModal?: () => void;
}

export default function LoginGoogle({ onSuccessCloseModal }: Props) {

    const { setAccessToken } = useAuth();

    async function handleGoogleLogin() {

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        const popupWidth = Math.min(500, screenWidth * 0.8);
        const popupHeight = Math.min(600, screenHeight * 0.8);

        const left = (screenWidth - popupWidth) / 2;
        const top = (screenHeight - popupHeight) / 2;

        const popup = window.open(
            BASE_URL + GOOGLEAUTH_URL,
            'google-login',
            `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );

        const messageListener = (event: MessageEvent) => {
            if (event.origin !== BASE_URL.replace("/foro", "")) return;

            if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {

                const accessToken = event.data?.accessToken;

                if (!accessToken) {
                    console.error('No se recibio un token de acceso o refresco', event.data);
                    alert('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
                    return;
                }

                setAccessToken(accessToken);
                popup?.close();
                window.removeEventListener('message', messageListener);
                onSuccessCloseModal?.();
            }
        };

        window.addEventListener('message', messageListener);

    }

    return (
        <div className="col-12 text-center mb-3">
            <button
                type="button"
                className="btn btn-light border d-flex align-items-center mx-auto"
                onClick={handleGoogleLogin}
            >
                <img
                    src={googleIcon}
                    alt="Google"
                    style={{ width: '24px', height: '24px', marginRight: '8px' }}
                />
                Continuar con Google
            </button>
        </div>
    );
}