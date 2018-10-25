import firebase from 'firebase';
import {
  SHELTER_UPDATE,
  SHELTER_CREATE,
  GET_SHELTER_PROFILE_SUCCESS,
  SAVE_SHELTER_PROFILE_SUCCESS
} from './types';

export const shelterUpdate = ({ prop, value }) => {
  return {
    type: SHELTER_UPDATE,
    payload: { prop, value }
  };
};

export const createShelter = ({ shelterName, phone, email, location, bio, navigationProps }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/shelterProfile`)
    .push({ shelterName, phone, email, location, bio })
    .then(() => {
      dispatch({ type: SHELTER_CREATE });
      navigationProps.navigate('shelterProfile');
  });
  };
};
export const getShelter = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/shelterProfile`)
      .on('value', snapshot => {
        dispatch({ type: GET_SHELTER_PROFILE_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const saveShelter = ({ shelterName, phone, email, location, bio, navigationProps }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/shelterProfile/${uid}`)
    .set({ shelterName, phone, email, location, bio })
    .then(() => {
      dispatch({ type: SAVE_SHELTER_PROFILE_SUCCESS });
      navigationProps.navigate('shelterProfile');
  });
  };
};
