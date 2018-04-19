import { call, put } from 'redux-saga/effects';
import { loadDraftEventsAPI } from './apiCalls';

export function* loadDraftEvents(action) {
  const league_id = action.league_id
  const contest_id = action.contest_id
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const token = userInfo.token
  try {
    //Get Contest information
    const draftEvents = yield call(loadDraftEventsAPI, league_id, contest_id, token);

    //Tell the store we are ready to be displayed
    yield put({type: 'FETCH_DRAFT_EVENTS_SUCCESS', payload: draftEvents.data});

  } catch(error) {
    yield put({type: 'FETCH_FAILED', error: error.message});
  }
}
