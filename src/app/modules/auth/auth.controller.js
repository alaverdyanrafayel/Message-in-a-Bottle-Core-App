import { SUCCESS_CODE } from '../../configs/status-codes';
import { UserService } from '../../services';
import { BadRequest, Conflict } from '../../errors';
import { EMAIL_EXISTS, USER_ADDED, USER_NOT_EXIST } from '../../configs/constants';
import Utils from '../../helpers/utils';
import { SocialService } from '../../services/social.service';

export class AuthController {
    /**
     * User registration
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    static async signup(req, res, next) {
        const { firstName, lastName, email, password } = req.body;
        let user;

        try {
            user = await UserService.getUserByEmail(email);

            if(user) {
                throw new BadRequest(EMAIL_EXISTS(email));
            }

            // Insert User details.
            user = await UserService.insertAndFetchUser({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            });

            if (!user) {
                throw new Conflict(USER_NOT_EXIST);
            }

            return res.status(SUCCESS_CODE).json({
                message: USER_ADDED,
                data: user,
                errors: null
            });
        }
        catch (err) {
            next(err);
        }
    }

    /**
     * Sign In User to the app.
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise.<*>}
     */
    static async login(req, res, next) {
        const { email, password } = req.body;

        let user;
        try {
            // Check if user exists by given email
            user = await UserService.getUserByEmail(email);

            // Check password
            if (!user || !user.validatePassword(password)) {
                return next(new BadRequest(USER_NOT_EXIST));
            }

            const tokenInfo = Utils.signJWTToken(user);

            return res.status(SUCCESS_CODE).json({
                token: {
                    access_token: tokenInfo.token,
                    refresh_token: tokenInfo.refreshToken,
                },
                user: {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name
                }
            });
        }
        catch (err) {
            return next(err);
        }
    }

    /**
     * Login with social network (instagram | facebook)
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    static async socialLogin(req, res, next) {
        let user;

        try {
            user = await SocialService.socialLogin(req.params.account, req.body);

            const tokenInfo = Utils.signJWTToken(user);

            return res.status(SUCCESS_CODE).json({
                token: {
                    access_token: tokenInfo.token,
                    refresh_token: tokenInfo.refreshToken,
                },
                user: {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name
                }
            });
        }
        catch (err) {
            return next(err);
        }

    }
}
