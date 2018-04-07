// @flow

import params from 'configs/params';

export const REQUIRED = (resource: string): string => `${resource} is required!`;

export const INVALID_EMAIL = (resource: string): string => `${resource} is invalid!`;

export const NUMBER_LETTER = (resource: string): string => `${resource} requires at least one number and letter!`;

export const INSTAGRAM_URL = `https://api.instagram.com/oauth/authorize/?client_id=${params.instagramClientId}&redirect_uri=${params.instagramRedirectUri}&response_type=code`;
export const FACEBOOK_URL = `https://www.facebook.com/v2.12/dialog/oauth?client_id=${params.facebookClientId}&redirect_uri=${params.facebookRedirectUri}&response_type=code`;

export const PASSWORD_MIN_LENGTH = 8;

export const LENGTH_REQUIRED =
(resource: string, options: { min?: number, max?: number}) => {
    const { min, max } = options;
    if (min && max) {
        return `${resource} must be at least ${min} and maximum ${max} characters!`;
    } else if (min) {
        return `${resource} must be at least ${min} characters!`;
    } else if (max) {
        return `${resource} must be maximum ${max} characters!`;
    }
};

export const SIGNUP = "/";

export const DASHBOARD = "/dashboard";

export const LOGIN = "/sign-in";

export const NOT_ALLOWED_IMAGE_EXTENSION = "The file is not an image";

export const LARGE_IMAGE_SIZE = "The file is too big";

export const LARGE_MESSAGE = "Message must not exceed 200 characters!";

export const BOTTLE_UPLOADED_SUCCESSFULLY = "Bottle successfully uploaded.";

export const ACCESS_TOKEN = 'token';