import type { Configuration, RedirectRequest } from '@azure/msal-browser';

const MSAL_CLIENT_ID = import.meta.env.VITE_MSAL_CLIENT_ID || '';
const MSAL_AUTHORITY = import.meta.env.VITE_MSAL_AUTHORITY || '';
const MSAL_REDIRECT_URI = import.meta.env.VITE_MSAL_REDIRECT_URI || window.location.origin;

export const msalConfig: Configuration = {
  auth: {
    clientId: MSAL_CLIENT_ID,
    authority: MSAL_AUTHORITY,
    redirectUri: MSAL_REDIRECT_URI,
    postLogoutRedirectUri: MSAL_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
};

export const loginRequest: RedirectRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'email'],
};

export const apiScopes: string[] = [
  import.meta.env.VITE_API_SCOPE || `api://${MSAL_CLIENT_ID}/access_as_user`,
];
