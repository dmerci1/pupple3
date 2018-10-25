import {
  DOG_UPDATE,
  DOG_CREATE,
  USER_DOG_CREATE,
  DOG_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  photo: 'https://media.istockphoto.com/vectors/labrador-retriever-dog-head-icon-logo-vector-vector-id628498902?k=6&m=628498902&s=612x612&w=0&h=n-y7bpkI0aU8IaSwXtPHub0yqEKpJqGtpqBKi7-xjUE=',
  name: '',
  breed: '',
  gender: '',
  age: '',
  bio: '',
  phone: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DOG_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case DOG_CREATE:
      return INITIAL_STATE;
    case USER_DOG_CREATE:
      return { ...state, INITIAL_STATE };
    case DOG_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
