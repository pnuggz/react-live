import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import { contests } from './contestsReducer';
import { login } from './loginReducer';
import { signup } from './signupReducer';


 const rootReducer = combineReducers({
   contests,
   login,
   signup,
   form: form
 });

 export default rootReducer;
