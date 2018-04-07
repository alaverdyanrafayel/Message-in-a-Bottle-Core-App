import AuthModule from './auth';
import BottlesModule from './bottles';

export default (router) => {

    const auth = new AuthModule(router);

    const bottles = new BottlesModule(router);

    const modules = [
        auth,
        bottles
    ];

    modules.forEach((module) => module.createEndpoints());
};
