import { takeLatest } from 'redux-saga/effects';
import { fork } from 'redux-saga/effects';
import { loadContests } from './loadContestsSaga';
import { signupRequest } from './signupSaga';
import { loginRequest, logout } from './loginSaga';

function* rootSaga() {
  /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
  yield [
    takeLatest('LOAD_CONTEST', loadContests),
    takeLatest('SIGNUP_REQUEST', signupRequest),
    takeLatest('LOGIN_REQUEST', loginRequest),
    takeLatest('CLIENT_UNSET', logout)
  ];
}

export default rootSaga;
