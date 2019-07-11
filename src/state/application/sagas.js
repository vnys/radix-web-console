import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { getRegistration } from '.';
import actionTypes from './action-types';
import actionCreators from './action-creators';

import * as appApi from '../../api/apps';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';

function* watchAppActions() {
  yield takeLatest(actionTypes.APP_DELETE_REQUEST, requestDeleteApp);
  yield takeLatest(actionTypes.APP_MODIFY_REQUEST, requestModifyApp);
  yield takeLatest(actionTypes.APP_CHANGE_ADMIN, changeAdmin);
}

export function* requestDeleteApp(action) {
  try {
    yield call(appApi.deleteApp, action.id);
    yield put(actionCreators.deleteAppConfirm(action.id));
  } catch (e) {
    yield put(actionCreators.deleteAppFail(action.id, e.message));
  }
}

export function* requestModifyApp(action) {
  try {
    yield call(appApi.modifyApp, action.id, action.registration);
    yield put(actionCreators.modifyAppConfirm(action.id));
    // Trigger a refresh of all subscribed data
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
    yield put(actionCreators.modifyAppFail(action.id, e.message));
  }
}

export function* changeAdmin(action) {
  const registration = yield select(getRegistration);
  const newRegistration = Object.assign({}, registration, action.adGroupConfig);
  yield put(actionCreators.modifyAppRequest(action.id, newRegistration));
}

export default function*() {
  yield all([watchAppActions()]);
}