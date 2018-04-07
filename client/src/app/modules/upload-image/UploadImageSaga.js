// @flow

import { Saga } from "redux-saga";
import { call, put, takeLatest } from 'redux-saga/effects';
import * as Actions from './UploadImageActions';
import { actions } from './UploadImageReducer';
import * as Api from '../../../api/UploadImageApi';

function* attemptSaveBottle({ payload: { data: { fields }} }: { payload: { data: { fields: Object }} }): Saga<void>  {
    try{    
        const response = yield call(Api.attemptSaveBottle, fields);
        yield put(Actions.attemptSaveBottleSucceed(response.data));
    } catch({response: {data: { message }}}) {
        yield put(Actions.attemptSaveBottleFailed(message))
    }
}

function* imageDataSaga(): Saga<void> {
   yield takeLatest(actions.ATTEMPT_SAVE_BOTTLE, attemptSaveBottle);
}

export default imageDataSaga;
