import { facebookClientId, facebookClientSecret, facebookRedirectUri } from './config';
import rp from 'request-promise';

export default class Facebook {
    static async getAccountInfo(code) {
        const options = {
            method: 'GET',
            uri: `https://graph.facebook.com/v2.12/oauth/access_token?client_id=${facebookClientId}&client_secret=${facebookClientSecret}&redirect_uri=${facebookRedirectUri}&code=${code}`,
            json: true,
        };
        let result = {};
        try {
            result = await rp(options);
            try {
                const userFields = 'name,email,first_name,last_name,location,education,picture';
                const media = await rp({
                    method: 'GET',
                    uri: `https://graph.facebook.com/v2.12/me?access_token=${result.access_token}&fields=${userFields}`,
                    json: true
                });
                result = {
                    ...result,
                    ...media,
                };
            } catch (er1) {
                console.log('Error with facebook media', er1.message);
            }
        }
        catch (er) {
            console.log('Error with facebook auth', er.message);

        }

        return result;
    }
}
