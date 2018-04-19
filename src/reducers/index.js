import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import { contests } from './contestsReducer';
import { login } from './loginReducer';
import { signup } from './signupReducer';
import { draftContest } from './draftContestReducer'
import { draftEvents } from './draftEventsReducer'
import { draftPlayers } from './draftPlayersReducer'


 const rootReducer = combineReducers({
   contests,
   login,
   signup,
   form: form,
   draftContest,
   draftEvents,
   draftPlayers
 });

 export default rootReducer;
