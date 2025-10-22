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

/**
 * @description Tipos para o mapa de clientes
 */
export interface MapLocation {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number]; // [longitude, latitude]
  category: string;
  address?: string;
  icon?: string;
  color?: string;
}

export interface MapData {
  center: [number, number]; // [longitude, latitude]
  zoom: number;
  locations: MapLocation[];
}
