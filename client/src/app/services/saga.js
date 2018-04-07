// @flow

import {Saga} from 'redux-saga';
import { all } from "redux-saga/effects";
import authUserSaga from '../modules/auth-user/AuthUserSaga';
import imageDataSaga from '../modules/upload-image/UploadImageSaga';

export default function*(): Saga<any> {
    yield all([
        authUserSaga(),
        imageDataSaga(),
    ]);
};
