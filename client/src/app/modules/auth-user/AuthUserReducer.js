// @flow

import { fromJS, Map } from 'immutable';
import { ACCESS_TOKEN } from 'configs/constants';

export const actions = {
    CLEAR: 'CLEAR',
    ATTEMPT_SIGN_UP: 'ATTEMPT_SIGN_UP',
    SIGN_UP_SUCCEED: 'SIGN_UP_SUCCEED',
    SIGN_UP_FAILED: 'SIGN_UP_FAILED',
    ATTEMPT_SIGN_IN: 'ATTEMPT_SIGN_IN',
    SIGN_IN_SUCCEED: 'SIGN_IN_SUCCEED',
    SIGN_IN_FAILED: 'SIGN_IN_FAILED',
    ATTEMPT_SOCIAL_LOGIN: 'ATTEMPT_SOCIAL_LOGIN',
    ATTEMPT_SOCIAL_LOGIN_SUCCEED: 'ATTEMPT_SOCIAL_LOGIN_SUCCEED',
    ATTEMPT_SOCIAL_LOGIN_FAILED: 'ATTEMPT_SOCIAL_LOGIN_FAILED',
};

const defaultState = fromJS({
    messages: {},
    message: null,
    fields: {},
    errors: {},
    prevSentEmail: null,
    loggedInUser: null
});

export default (state: any = defaultState, { type, payload }: { type: string, payload: any}) => {
    switch (type) {
        case actions.CLEAR:
                return state    
                .set('message', null)
                .set('messages', Map())
                .set('fields', Map())
                .set('errors', Map())

        case actions.SIGN_UP_SUCCEED:
                return state
                        .set('loggedInUser', fromJS(payload.data.data))
        
        case actions.SIGN_UP_FAILED:
                return state
                        .set('message', payload.message);

        case actions.ATTEMPT_SOCIAL_LOGIN_SUCCEED:
                localStorage.setItem(ACCESS_TOKEN, payload.data.token.access_token);

                return state        
                        .set('loggedInUser', fromJS(payload.data.user));

        case actions.ATTEMPT_SOCIAL_LOGIN_FAILED:
                return state
                        .set('message', payload.data)

        case actions.SIGN_IN_SUCCEED:
                localStorage.setItem(ACCESS_TOKEN, payload.token.token.access_token);

                return state
                        .set('loggedInUser', fromJS(payload.user));

        case actions.SIGN_IN_FAILED:
                return state
                        .set('message', Map(payload.message || {}))
                        .set('fields', Map(payload.fields || {}))
                        .set('errors', Map(payload.errors || {}));
        default:
            return state;
                    
    }
}
