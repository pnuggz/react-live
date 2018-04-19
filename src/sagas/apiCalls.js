/* eslint-disable no-console */
import ContestsAPI from '../apis/contestsApi';
import SignupAPI from '../apis/signupApi';
import LoginAPI from '../apis/loginApi';
import DraftContestAPI from '../apis/draftContestApi'
import DraftEventsAPI from '../apis/draftEventsApi'
import DraftPlayersAPI from '../apis/draftPlayersApi'

export const loadContestsAPI = () => {
  console.log('loading contests');
  return (
    ContestsAPI.getContests().then(res => res.json()).then(contests => contests.data.active_contests)
  );
};

export const loadDraftContestAPI = (league_id, contest_id, token) => {
  console.log('loading draft contest');
  return (
    DraftContestAPI.getContest(league_id, contest_id, token).then(res => res.json()).then(draftContest => draftContest)
  );
};

export const loadDraftEventsAPI = (league_id, contest_id, token) => {
  console.log('loading draft events');
  return (
    DraftEventsAPI.getEvents(league_id, contest_id, token).then(res => res.json()).then(draftEvents => draftEvents)
  );
};

export const loadDraftPlayersAPI = (league_id, contest_id, token) => {
  console.log('loading draft players');
  return (
    DraftPlayersAPI.getPlayers(league_id, contest_id, token).then(res => res.json()).then(draftPlayers => draftPlayers)
  );
};

export const loginAPI = (username, password) => {
  console.log('logging in SAGA API');
  return (
    LoginAPI.loginRequest(username, password).then(res => res.json()).then(login => login)
  );
};

export const signupAPI = (first_name, last_name, username, email, password, password2, address, zipcode, mobilephone, gender, birthday, subscribe) => {
  console.log('signing up');
  return (
    SignupAPI.signupRequest(first_name, last_name, username, email, password, password2, address, zipcode, mobilephone, gender, birthday, subscribe).then(res => res.json()).then(register_success => register_success)
  );
};