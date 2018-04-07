if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

import env from 'env-var';

export const mongoUrl = env.get('MONGO_URL').asString();
export const apiURL = env.get('API_URL').asString();
export const appURL = env.get('APP_URL').asString();
export const port = env.get('PORT').asString();
export const tokenSecret = env.get('TOKEN_SECRET').asString();

// instagram configs
export const instagramClientId = env.get('INSTAGRAM_CLIENT_ID').asString();
export const instagramClientSecret = env.get('INSTAGRAM_CLIENT_SECRET').asString();
export const instagramRedirectUri = env.get('INSTAGRAM_REDIRECT_URI').asString();

// facebook configs
export const facebookClientId = env.get('FACEBOOK_CLIENT_ID').asString();
export const facebookClientSecret = env.get('FACEBOOK_CLIENT_SECRET').asString();
export const facebookRedirectUri = env.get('FACEBOOK_REDIRECT_URI').asString();
