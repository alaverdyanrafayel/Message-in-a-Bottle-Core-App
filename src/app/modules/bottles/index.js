import { Router } from 'express';
import endpoints from './endpoints';

export default class UploadsModule {
    apiRouter;
    router;

    constructor (apiRouter) {
        this.apiRouter = apiRouter;
        this.router = Router();
    }

    createEndpoints() {
        this.assignRouter();
        this.assignEndpoints();
    }

    assignRouter() {
        this.apiRouter.use('/bottles', this.router);
    }

    assignEndpoints() {
        endpoints(this.router);
    }
}
