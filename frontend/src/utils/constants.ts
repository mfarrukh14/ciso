export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'NextGen Forex Systems',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  TRADING: '/trading',
  CONTACT: '/contact',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  PORTFOLIO: '/dashboard/portfolio',
} as const;

export const THEME_STORAGE_KEY = 'theme';
export const AUTH_TOKEN_KEY = 'authToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const USER_STORAGE_KEY = 'user';
