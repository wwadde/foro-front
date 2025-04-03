import axios from 'axios';
import { BASE_URL, LOGIN_URL, REGISTER_URL } from '../utils/constants/ApiConstants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

type LoginRequest = {
  username: string;
  password: string;
}

type RegisterRequest = {
  username: string;
  password: string;
  email: string;
}

export async function login( {username, password}: LoginRequest) {
  try {
    return await api.post(LOGIN_URL, { username, password });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al loguearse inténtelo de nuevo');
    } else {
      throw new Error('Error al loguearse inténtelo de nuevo');
    }
  }
}

export function register( {username, password, email}: RegisterRequest) {
  api.post(REGISTER_URL, { username, password, email }).then(response => {
    return response;
  }).catch(error => {
    throw new Error('Error al registrarse ' + error);
  });

}


