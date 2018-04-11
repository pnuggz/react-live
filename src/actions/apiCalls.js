/* eslint-disable no-console */
import ContestsAPI from '../apis/contestsApi';

export const loadContestsAPI = () => {
  console.log('loading contests');
  return (
    ContestsAPI.getContests().then(res => res.json()).then(contests => contests.data.active_contests)
  );
};
