import { takeLatest } from 'redux-saga/effects';
import { fork } from 'redux-saga/effects';
import { loadContests } from '../actions/loadContests';

function* rootSaga() {
  /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
  yield [
    takeLatest('LOAD_CONTEST', loadContests)
  ];
}

export default rootSaga;
