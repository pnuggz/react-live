import { call, put } from 'redux-saga/effects';
import { loadContestsAPI } from './apiCalls';

export function* loadContests() {
  try {
    //Get Contest information
    const contests = yield call(loadContestsAPI);

    console.log(contests);

    //Tell the store we are ready to be displayed
    yield put({type: 'FETCH_CONTEST_SUCCESS', payload: contests});

  } catch(error) {
    yield put({type: 'FETCH_FAILED', error: error.message});
  }
}
