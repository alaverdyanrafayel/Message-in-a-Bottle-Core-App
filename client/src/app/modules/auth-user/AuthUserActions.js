// @flow

import { actions } from './AuthUserReducer';

export function clear() {
    return { type: actions.CLEAR };
}

export function attemptSignUp(data: Object) {
    return { type: actions.ATTEMPT_SIGN_UP, payload: { data } };
}

export function signUpSucceed(data: Object) {
    return { type: actions.SIGN_UP_SUCCEED, payload: { data } };
}

// export function signUpSucceed(result) {
//     return { type: actions.SIGN__SUCCEED, payload: { user: result.user, token: result.token } };
// }


export function signUpFailed(message: string) {
    return {
        type: actions.SIGN_UP_FAILED,
        payload: {
            message,
        }
    };
}

export function attemptSocialLogin(data: Object){
    return { type: actions.ATTEMPT_SOCIAL_LOGIN, payload: { data }}
};

export function attemptSocialLoginSucceed(data: Object){
    return { type: actions.ATTEMPT_SOCIAL_LOGIN_SUCCEED, payload: { data }}
};

export function attemptSocialLoginFailed(data: Object){
    return { type: actions.ATTEMPT_SOCIAL_LOGIN_FAILED, payload: { data }}
};

export function attemptSignIn(data: Object){
    return { type: actions.ATTEMPT_SIGN_IN, payload: { data }}
};

export function signInSucceed(result: Object) {
    return { type: actions.SIGN_IN_SUCCEED, payload: { user: result.user, token: result.token } };
}

export function signInFailed(fields, message = null, errors = null) {
    return {
        type: actions.SIGN_IN_FAILED,
        payload: {
            fields: fields,
            message: message && {
                message: message
            },
            errors: errors
        }
    };
}
