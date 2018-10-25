import firebase from 'firebase';
import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Navigator } from '../components/Navigator';
import { LOGIN_USER_SUCCESS } from '../actions/types';

const router = Navigator.router;
const mainNavAction = router.getActionForPathAndParams('auth');
//const newNavAction = router.getActionForPathAndParams('swipe');
const initialNavState = router.getStateForAction(mainNavAction);

const NavReducer = (state = initialNavState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);

  return nextState || state;
};

export default NavReducer;
