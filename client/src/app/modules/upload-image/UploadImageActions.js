// @flow

import { actions } from './UploadImageReducer';

export function attemptUploadImage(data: Object) {
    return { type: actions.ATTEMPT_UPLOAD_IMAGE, payload: { data } };
}

export function attemptUploadImageSucceed(data: Object) {
    return { type: actions.ATTEMPT_UPLOAD_IMAGE_SUCCEED, payload: { data } };
}

export function attemptUploadImageFailed(data: Object) {
    return { type: actions.ATTEMPT_UPLOAD_IMAGE_FAILED, payload: { data } };
}

export function attemptUploadImageDescription(data: Object) {
    return { type: actions.ATTEMPT_UPLOAD_IMAGE_DESCRIPTION, payload: { data } };
}

export function attemptSaveBottle(data: Object) {
    return { type: actions.ATTEMPT_SAVE_BOTTLE, payload: { data } };
}

export function attemptSaveBottleSucceed(data: Object) {
    return { type: actions.ATTEMPT_SAVE_BOTTLE_SUCCEED, payload: { data } };
}

export function attemptSaveBottleFailed(data: Object) {
    return { type: actions.ATTEMPT_SAVE_BOTTLE_FAILED, payload: { data } };
}
