import * as firebase from 'firebase';
import {
  PROFILE_UPDATE,
  PROFILE_SAVE,
  GET_PROFILE
} from './types';

export const profileUpdate = ({ prop, value }) => {
  return {
    type: PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const profileSave = ({ photo, firstName, lastName, bio }) => {
    const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref('/users/dongs')
    .push({ photo, firstName, lastName, bio })
    .then(() => {
      dispatch({ type: PROFILE_SAVE });
  });
  };
};


export const getProfile = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref('/users/dongs')
      .on('value', snapshot => {
        dispatch({ type: GET_PROFILE, payload: snapshot.val() });
      });
  };
};
