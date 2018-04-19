/* eslint-disable no-console */
let intialState = {
  draftPlayers: [{
    player_phase_id: '',
    first_name: '',
    last_name: '',
    team_phase_id: '',
    team_name: '',
    team_shorthand: '',
    descrip: '',
    pos: '',
    role: '',
    oppid: '',
    opp_team_name: '',
    opp_team_shorthand: '',
    fp_avg: '',
    fp_form: '',
    salary: '',
    selected: false
  }],
  isLoading: ''
}

export function draftPlayers(state = intialState, action) {
  console.log(action)
  switch(action.type) {
    case 'FETCH_DRAFT_PLAYERS_SUCCESS':
      return { 
        isLoading: false, 
        draftPlayers: action.payload
      };

    default :
      return state;
  }
};
