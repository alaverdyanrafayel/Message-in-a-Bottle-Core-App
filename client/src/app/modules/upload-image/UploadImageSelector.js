// @flow

import {createSelector} from "reselect";

const imageDataSelector = (state) => state.get('uploadImageData');

const messageSelector = createSelector(
    imageDataSelector, (imageData) => imageData.get('message')
);

const fieldsSelector = createSelector(
    imageDataSelector, (imageData) => imageData.get('fields')
);

const errorsSelector = createSelector(
    imageDataSelector, (imageData) => imageData.get('errors')
);

export default (state: Object) => {
    return {
        imageMessage: messageSelector(state),
        imageFields: fieldsSelector(state),
        imageErrors: errorsSelector(state),
    };
};
