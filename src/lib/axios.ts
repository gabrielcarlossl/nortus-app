import axios from 'axios';
import { API_BASE_URL } from '@/constants';

/**
 * @description Instância configurada do Axios
 * Base URL: API mockada da nortus
 * Timeout: 10 segundos
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @description Interceptor de requisição
 * Adiciona o token de autenticação se disponível
 */
apiClient.interceptors.request.use(
  config => {
    // Token será adicionado via cookies no middleware
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * @description Interceptor de resposta
 * Trata erros globais da API
 */
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirecionar para login se não autenticado
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
