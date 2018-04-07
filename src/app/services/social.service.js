import { UserService } from '../services';
import Instagram from '../helpers/instagram';
import Facebook from '../helpers/facebook';
import { BadRequest } from '../errors';

export class SocialService {

    constructor () {}

    static async socialLogin(account, data) {

        let user;
        switch(account) {
                case 'instagram':
                    try {
                        let accountInfo = await Instagram.getAccountInfo(data.code);

                        user = await UserService.getUserByAccountId(accountInfo.user.id);

                        if (!user) {
                            user = await UserService.insertAndFetchUser({
                                accountId: accountInfo.user.id,
                                instagram_access_token: accountInfo.access_token,
                                username: accountInfo.user.username,
                                profile_picture: accountInfo.user.profile_picture,
                                first_name: accountInfo.user.full_name.split(' ')[0],
                                last_name: accountInfo.user.full_name.split(' ')[1],
                                loc: accountInfo.location
                            });
                        }

                    } catch(e) {
                        throw new BadRequest('Bad Credentials');
                    }

                    break;
                case 'facebook':
                    try {
                        let accountInfo = await Facebook.getAccountInfo(data.code);

                        user = await UserService.getUserByAccountId(accountInfo.id);

                        if (!user) {
                            user = await UserService.insertAndFetchUser({
                                accountId: accountInfo.id,
                                facebook_access_token: accountInfo.access_token,
                                username: accountInfo.name,
                                profile_picture: accountInfo.picture && accountInfo.picture.data && accountInfo.picture.data.url || '',
                                first_name: accountInfo.first_name,
                                last_name: accountInfo.last_name,
                                location: accountInfo.location && accountInfo.location.name || '',
                                education: accountInfo.education || [],
                                email: accountInfo.email,
                            });
                        }

                    } catch(e) {
                        throw new BadRequest('Bad Credentials');
                    }

                    break;
        }
    
        return user;
    }
}
