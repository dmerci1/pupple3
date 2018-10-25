import * as firebase from 'firebase';
import {
  DOG_UPDATE,
  DOG_CREATE,
  USER_DOG_CREATE,
  DOGS_FETCH_SUCCESS,
  DOG_SAVE_SUCCESS,
  DOG_PHOTOS,
  IMAGE_PRESS
} from './types';

export const dogUpdate = ({ prop, value }) => {
  return {
    type: DOG_UPDATE,
    payload: { prop, value }
  };
};

export const dogCreate = ({ photo, name, breed, gender, age, bio, phone, navigationProps }) => {
    const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/dogs`)
    .push({ photo, name, breed, gender, age, bio, phone })
    .then(() => {
      dispatch({ type: DOG_CREATE });
      navigationProps.navigate('doglist');
  });
  };
};

export const userDogCreate = ({ photo, name, breed, gender, age, bio, phone, uid, navigationProps }) => {
const doggy = firebase.database().ref().child('shelterDogs');
const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref('/shelterDogs/dogs')
    .push({ photo, name, breed, gender, age, bio, phone })
    .then(() => {
      dispatch({ type: USER_DOG_CREATE });
      navigationProps.navigate('doglist');
  });
  };
};

export const dogPhotos = async (uri, uid) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const { currentUser } = firebase.auth();
  var ref = firebase.storage().ref(`/users/${currentUser.uid}`).child(`/dogs/${uid}/photos`);
  var pathReference = firebase.database().ref(`/users/${currentUser.uid}`).child('/images');
  const snapshot = await ref.put(blob);
  return (dispatch) => {
    firebase.database.ref('/shelterdogs/images')
  pathReference.push(snapshot.downloadURL )
    .then(() => {
      dispatch({ type: DOG_PHOTOS });
    });
  };
};

export const imagePress = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
     firebase.database().ref(`/users/${currentUser.uid}/dogs`)
      .on('value', snapshot => {
        dispatch({ type: IMAGE_PRESS, payload: snapshot.val() });
      });
  };
};

export const fetchDogs = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/dogs`)
      .on('value', snapshot => {
        dispatch({ type: DOGS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const fetchAllDogs = () => {

  return (dispatch) => {
      firebase.database().ref('/shelterDogs/dogs')
      .on('value', snapshot => {
        dispatch({ type: DOGS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const fetchSavedDogs = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/SavedDogs/dogs`).child('item')
      .on('value', snapshot => {
        dispatch({ type: DOGS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const dogSave = ({ photo, name, breed, gender, age, bio, phone, uid, navigationProps }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/dogs/${uid}`)
    .set({ photo, name, breed, gender, age, bio, phone })
    .then(() => {
      dispatch({ type: DOG_SAVE_SUCCESS });
      navigationProps.navigate('doglist');
  });
  };
};

export const userDogSave = ({ photo, name, breed, gender, age, bio, phone, uid }) => {

  return (dispatch) => {
    firebase.database().ref(`/shelterDogs/dogs/${uid}`)
    .update({ photo, name, breed, gender, age, bio, phone })
    .then(() => {
      dispatch({ type: DOG_SAVE_SUCCESS });
  });
  };
};


export const dogDelete = ({ uid, navigationProps }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/dogs/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: DOG_SAVE_SUCCESS });
        navigationProps.navigate('doglist');
      });
  };
};

export const userDogDelete = ({ uid, navigationProps }) => {

  return (dispatch) => {
    firebase.database().ref(`/userDogs/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: DOG_SAVE_SUCCESS });
        navigationProps.navigate('doglist');
      });
  };
};
