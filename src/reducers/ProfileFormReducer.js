import {
  PROFILE_UPDATE,
  PROFILE_SAVE
} from '../actions/types';

const INITIAL_STATE = {
  photo: 'https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png',
  firstName: '',
  lastName: '',
  bio: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PROFILE_SAVE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
