/**
 * @description Tipos globais da aplicação
 */

export interface User {
  username: string;
  email?: string;
}

export interface AuthResponse {
  data: {
    accessToken: string;
    username: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
