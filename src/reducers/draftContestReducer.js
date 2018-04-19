/* eslint-disable no-console */
let intialState = {
  draftContest: {
    league_id: '',
    league_name: '',
    league_shorthand: '',
    contest_id: '',
    contest_name: '',
    entry_count: '',
    entry_fee: '',
    entry_max: '',
    entry_max_register: '',
    prize: '',
    prizeint: '',
    sponsorbannerdesktop: '',
    sponsorbannermobile: '',
    sponsorbannertablet: '',
    sponsorlogodesktop: '',
    sponsorlogomobile: '',
    sponsorlogotablet: '',
    sponsorname: '',
    sponsors_id: '',
    start_date: '',
    start_fulldate: '',
    start_time: '',
    start_timestamp: '',
    user_entry_count: ''
  },
  isLoading: ''
}

export function draftContest(state = intialState, action) {
  switch(action.type) {
    case 'FETCH_DRAFT_CONTEST_SUCCESS':
      return { 
        isLoading: false, 
        draftContest: action.payload
      };

    default :
      return state;
  }
};
