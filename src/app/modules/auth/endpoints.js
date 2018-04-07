import { AuthController } from './auth.controller';
import middlewares from '../../middlewares';
import schemas from './schemas';

export default (router) => {

    router.post('/register', ...middlewares(schemas, 'signup'), AuthController.signup);

    router.post('/login', ...middlewares(schemas, 'login'), AuthController.login);

    router.post('/social-login/:account', AuthController.socialLogin);
};
