import {
    apiURL,
    appURL,
    port,
    tokenSecret
} from '../helpers/config';

const params = {
    development: {
        apiUrl: apiURL,
        appUrl: appURL,
        apiPort: port,
        tokenSecret: tokenSecret
    },
    production: {
        apiUrl: apiURL,
        appUrl: appURL,
        apiPort: port,
        tokenSecret: tokenSecret
    }
};

export default params[process.env.NODE_ENV || 'development'];
