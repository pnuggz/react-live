import { takeLatest, take } from 'redux-saga/effects';
import { fork } from 'redux-saga/effects';
import { loadContests } from './loadContestsSaga';
import { signupRequest } from './signupSaga';
import { loginRequest, logout } from './loginSaga';
import { loadDraftContest } from './loadDraftContestSaga';
import { loadDraftEvents } from './loadDraftEventsSaga';
import { loadDraftPlayers } from './loadDraftPlayersSaga'

function* rootSaga() {
  /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
  yield [
    takeLatest('LOAD_CONTEST', loadContests),
    takeLatest('SIGNUP_REQUEST', signupRequest),
    takeLatest('LOGIN_REQUEST', loginRequest),
    takeLatest('CLIENT_UNSET', logout),
    takeLatest('LOAD_DRAFT_CONTEST', loadDraftContest),
    takeLatest('LOAD_DRAFT_EVENTS', loadDraftEvents),
    takeLatest('LOAD_DRAFT_PLAYERS', loadDraftPlayers)
  ];
}

export default rootSaga;
