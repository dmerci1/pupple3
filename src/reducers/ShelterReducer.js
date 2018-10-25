import {
  GET_SHELTER_PROFILE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHELTER_PROFILE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
