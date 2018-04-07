// @flow

import {combineReducers} from "redux-immutable";
import {Map} from "immutable";
import userData from '../modules/auth-user/AuthUserReducer';
import uploadImageData from '../modules/upload-image/UploadImageReducer';

export default combineReducers({
    userData,
    uploadImageData
});
