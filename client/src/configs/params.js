// @flow

import {
    host,
    apiUrl,
    googleMapUrl,
    instagramClientId,
    instagramRedirectUri,
    facebookClientId,
    facebookRedirectUri
} from 'helpers/config';

const urls = {
    development: {
        hostname: host,
        httpsEnabled: false,
        apiUrl: apiUrl,
        googleMapUrl: googleMapUrl,
        instagramClientId: instagramClientId,
        instagramRedirectUri: instagramRedirectUri,
        facebookClientId: facebookClientId,
        facebookRedirectUri: facebookRedirectUri
    },
    production: {
        hostname: host,
        httpsEnabled: true,
        env: 'production',
        apiUrl: apiUrl,
        googleMapUrl: googleMapUrl,
        instagramClientId: instagramClientId,
        instagramRedirectUri: instagramRedirectUri,
        facebookClientId: facebookClientId,
        facebookRedirectUri: facebookRedirectUri
    }
};

export default urls[process.env.NODE_ENV || 'development'];
