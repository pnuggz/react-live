import { call, put } from 'redux-saga/effects';
import { loadDraftPlayersAPI } from './apiCalls';

export function* loadDraftPlayers(action) {
  const league_id = action.league_id
  const contest_id = action.contest_id
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const token = userInfo.token
  try {
    //Get Contest information
    const draftPlayers = yield call(loadDraftPlayersAPI, league_id, contest_id, token);

    //Tell the store we are ready to be displayed
    yield put({type: 'FETCH_DRAFT_PLAYERS_SUCCESS', payload: draftPlayers.data});

  } catch(error) {
    yield put({type: 'FETCH_FAILED', error: error.message});
  }
}
