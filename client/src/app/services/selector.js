// @flow

import AuthUserSelector from '../modules/auth-user/AuthUserSelector';

import UploadImageSelector from '../modules/upload-image/UploadImageSelector';

export default (state: Object, all: boolean = true, modules: Array<string> = []) => {
    if (all) {
        return {
            ...AuthUserSelector(state),
            ...UploadImageSelector(state),
        };
    }

    let stateInProps = {};

    if (modules.includes('auth-user')) {
        stateInProps = Object.assign({}, stateInProps, { ...AuthUserSelector(state) });
    }

    if (modules.includes('upload-image')) {
        stateInProps = Object.assign({}, stateInProps, { ...UploadImageSelector(state) });
    }

    return stateInProps;
};
