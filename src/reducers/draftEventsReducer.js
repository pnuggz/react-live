/* eslint-disable no-console */
let intialState = {
  draftEvents: [{
    eventsid: '',
    team_id_home: '',
    team_full_home: '',
    team_name_home: '',
    team_id_away: '',
    team_full_away: '',
    team_name_away: '',
    start_date: '',
    start_time: '',
    start_timestap: '',
    start_fulldate: '',
    home_ground: '',
    status: ''
  }],
  isLoading: ''
}

export function draftEvents(state = intialState, action) {
  console.log(action)
  switch(action.type) {
    case 'FETCH_DRAFT_EVENTS_SUCCESS':
      return { 
        isLoading: false, 
        draftEvents: action.payload
      };

    default :
      return state;
  }
};
