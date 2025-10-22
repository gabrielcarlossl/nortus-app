import apiClient from '@/lib/axios';
import Cookies from 'js-cookie';
import type { AuthResponse, LoginCredentials } from '@/types';
import { AUTH_COOKIE_NAME, TOKEN_EXPIRY_DAYS, USER_STORAGE_KEY } from '@/constants';

/**
 * @description Serviço de autenticação
 * Gerencia login, logout e persistência de dados
 */
class AuthService {
  /**
   * @description Realiza login do usuário
   * @param credentials - Credenciais de login (email e senha)
   * @returns Promise com dados de autenticação
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simula validação de credenciais antes de chamar API
      // Em produção, isso seria feito no backend
      const response = await apiClient.get<AuthResponse>('/login.json');
      
      const { accessToken, username } = response.data.data;

      // Armazena token em cookie
      Cookies.set(AUTH_COOKIE_NAME, accessToken, {
        expires: TOKEN_EXPIRY_DAYS,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      // Armazena informações do usuário no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify({
            username,
            email: credentials.email,
          })
        );
      }

      return response.data;
    } catch {
      throw new Error('Falha ao realizar login. Verifique suas credenciais.');
    }
  }

  /**
   * @description Realiza logout do usuário
   * Remove token e dados do usuário
   */
  logout(): void {
    Cookies.remove(AUTH_COOKIE_NAME);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  /**
   * @description Verifica se usuário está autenticado
   * @returns true se token existe
   */
  isAuthenticated(): boolean {
    return !!Cookies.get(AUTH_COOKIE_NAME);
  }

  /**
   * @description Obtém token de autenticação
   * @returns Token JWT ou undefined
   */
  getToken(): string | undefined {
    return Cookies.get(AUTH_COOKIE_NAME);
  }

  /**
   * @description Obtém dados do usuário do localStorage
   * @returns Dados do usuário ou null
   */
  getUser(): { username: string; email: string } | null {
    if (typeof window === 'undefined') return null;

    const userData = localStorage.getItem(USER_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }
}

export const authService = new AuthService();
