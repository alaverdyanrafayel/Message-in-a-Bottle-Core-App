// @flow

import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import {Store} from "react-redux";
import {fromJS} from "immutable";
import {throttle} from "lodash";

export default (rootReducer: any, rootSaga: any) => {

    let store;

    const initialState = fromJS({});

    const sagaMiddleware = createSagaMiddleware();

    store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga);

    return store;
};
