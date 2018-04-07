// @flow

import { Saga } from "redux-saga";
import { call, put, takeLatest } from 'redux-saga/effects';
import * as Actions from './AuthUserActions';
import { actions } from './AuthUserReducer';
import * as Api from 'api/AuthUserApi';

function* attemptSignUp({ payload: { data} }: { payload: { data: Object}}): Saga<void>  {
    try{    
        yield put(Actions.clear()); 
        const response = yield call(Api.attemptSignUp, data);
        yield put(Actions.signUpSucceed(response.data));
    } catch({response: {data: { message }}}) {
        yield put(Actions.signUpFailed(message))
    }
}

function* attemptSocialLogin({ payload: { data} }: { payload: { data: Object}}): Saga<void>  {
    try{    
        const response = yield call(Api.attemptSocialLogin, data);
        yield put(Actions.attemptSocialLoginSucceed(response.data));
    } catch({ response: { data: { message } } }) {
        yield put(Actions.attemptSocialLoginFailed(message));       
    }
}

function* attemptSignIn({ payload: { data } }: { payload: { data: Object}}): Saga<void>  {
    try {
        const { data: token } = yield call(Api.attemptSignIn, data);
        yield put(Actions.signInSucceed({ user: token.user, token }));
    } catch ({ response: { status, data: { message } } }) {
        yield put(Actions.signInFailed(data, message));
    }
}

function* authUserSaga(): Saga<void> {
   yield takeLatest(actions.ATTEMPT_SIGN_UP, attemptSignUp);
   yield takeLatest(actions.ATTEMPT_SOCIAL_LOGIN, attemptSocialLogin); 
   yield takeLatest(actions.ATTEMPT_SIGN_IN, attemptSignIn);      
}

export default authUserSaga;
