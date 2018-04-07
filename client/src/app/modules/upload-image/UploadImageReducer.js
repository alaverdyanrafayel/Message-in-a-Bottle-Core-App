// @flow

import { fromJS, Map } from 'immutable';

export const actions = {
    ATTEMPT_UPLOAD_IMAGE: 'ATTEMPT_UPLOAD_IMAGE',
    ATTEMPT_UPLOAD_IMAGE_DESCRIPTION: 'ATTEMPT_UPLOAD_IMAGE_DESCRIPTION',
    ATTEMPT_SAVE_BOTTLE: 'ATTEMPT_SAVE_BOTTLE',
    ATTEMPT_SAVE_BOTTLE_SUCCEED: 'ATTEMPT_SAVE_BOTTLE_SUCCEED',
    ATTEMPT_SAVE_BOTTLE_FAILED: 'ATTEMPT_SAVE_BOTTLE_FAILED',
};

const defaultState = fromJS({
    message: null,
    fields: {
        file: '',
        base64File: '',
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        country: '',
        title: '',
        message: '',
        age: ''
    },
    errors: {
        file: '',
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        country: '',
        title: '',
        message: '',
        age: ''
    }
});

export default (state: any = defaultState, { type, payload }: { type: string, payload: any}) => {
    switch (type) {
        case actions.ATTEMPT_UPLOAD_IMAGE:
            return state       
                    .setIn(['fields', 'file'], payload.data.file) 
                    .setIn(['fields', 'base64File'], payload.data.base64File) 

        case actions.ATTEMPT_UPLOAD_IMAGE_DESCRIPTION:
            return state
                    .set("fields", fromJS(payload.data.fields))
                    .set("errors", fromJS(payload.data.errors))

        case actions.ATTEMPT_SAVE_BOTTLE_SUCCEED:
            return state
                    .set('message', payload.data.message)

        case actions.ATTEMPT_SAVE_BOTTLE_FAILED: 
            return state
                    .set('message', payload.data)

        default:
            return state;
                    
    }
}
