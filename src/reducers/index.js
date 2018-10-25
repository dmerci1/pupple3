import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import DogFormReducer from './DogFormReducer';
import DogReducer from './DogReducer';
import AuthReducer from './AuthReducer';
import ProfileFormReducer from './ProfileFormReducer';

export default combineReducers({
  nav: NavReducer,
  auth: AuthReducer,
  dogForm: DogFormReducer,
  dogs: DogReducer,
  profileForm: ProfileFormReducer,
});
