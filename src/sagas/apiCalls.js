/* eslint-disable no-console */
import ContestsAPI from '../apis/contestsApi';
import SignupAPI from '../apis/signupApi';
import LoginAPI from '../apis/loginApi';

export const loadContestsAPI = () => {
  console.log('loading contests');
  return (
    ContestsAPI.getContests().then(res => res.json()).then(contests => contests.data.active_contests)
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