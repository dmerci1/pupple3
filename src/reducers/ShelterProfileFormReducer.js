import {
  SHELTER_UPDATE,
  SHELTER_CREATE,
  SAVE_SHELTER_PROFILE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  email: '',
  location: '',
  bio: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHELTER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SHELTER_CREATE:
      return INITIAL_STATE;
    case SAVE_SHELTER_PROFILE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
