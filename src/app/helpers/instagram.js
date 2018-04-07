import { instagramClientId, instagramClientSecret, instagramRedirectUri } from './config';
import rp from 'request-promise';

export default class Instagram {
    static async getAccountInfo(code) {
        const options = {
            method: 'POST',
            uri: 'https://api.instagram.com/oauth/access_token',
            form: {
                client_id: instagramClientId,
                client_secret: instagramClientSecret,
                grant_type: 'authorization_code',
                redirect_uri: instagramRedirectUri,
                code: code
            },
            json: true
        };

        const result = await rp(options);

        const media = await rp({
            method: 'GET',
            uri: `https://api.instagram.com/v1/users/self/media/recent/?access_token=${result.access_token}`,
            json: true
        });

        if (media.data.length > 0 && media.data[0].location) {
            result.location = [media.data[0].location.latitude, media.data[0].location.longitude];
        }

        return result;
    }
}
