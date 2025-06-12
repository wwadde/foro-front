import axios from 'axios';
import { BASE_URL, LOGIN_URL, ENVIAROTP_URL, REGISTRARUSUARIO_URL } from '../utils/constants/ApiConstants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

type LoginRequest = {
  username: string;
  password: string;
};

type RegisterRequest = {
  username: string;
  password: string;
  email: string;
};


export async function login({ username, password }: LoginRequest) {
  try {
    const response = await api.post(LOGIN_URL, { username, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response.data.message || 'Error al iniciar sesión');
    
    } else {
      throw new Error('Error al iniciar sesión');
    }
  }
}

export async function registrarEnviarOTP({ username, password, email }: RegisterRequest) {
  try {
    const response = await api.post(ENVIAROTP_URL, { username, password, email });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al registrarse');
    } else {
      throw new Error('Error al registrarse');
    }
  }
}

export async function validarOTP({ username, password, email }: RegisterRequest, otp: string) {
  try {
    const response = (await api.post(REGISTRARUSUARIO_URL, { username, password, email, otp },
      {
        headers:{ 'otp': otp }
      }));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al validar OTP');
    } else {
      throw new Error('Error al validar OTP');
    }
  }
}
