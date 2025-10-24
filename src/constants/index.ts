/**
 * @description Constantes de configuração da aplicação
 */

export const APP_NAME = 'Nortus';

export const API_BASE_URL = 'https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TICKETS: '/dashboard/tickets',
  SIMULATOR: '/dashboard/simulator',
  CLIENT_360: '/dashboard/client-360',
  SETTINGS: '/dashboard/settings',
} as const;

export const AUTH_COOKIE_NAME = 'nortus_auth_token';
export const USER_STORAGE_KEY = 'nortus_user';

export const TOKEN_EXPIRY_DAYS = 7;
