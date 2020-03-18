import {
  LOGIN,
  SIGNUP,
  AUTHENTICATE,
  LOGOUT,
  FORGOTPASS,
  LOGINMYAPP
} from '../actions/auth';

const initialState = {
  token: 'token nezmeneny napr',
  userId: null,
  fullname: '',
  phonenumber: '',
  ridesCompleted: '',
  startDate: null,
  relationId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };
    case LOGOUT:
      return initialState;
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId
      };
    case LOGINMYAPP:
      return {
        token: action.token,
        relationId: action.relationId,
        fullName: action.fullName,
        phoneNumber: action.phoneNumber,
        ridesCompleted: action.ridesCompleted,
        startDate: action.startDate
      };

    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId
      };
    case FORGOTPASS:
      return {
        email: action.email
      };
    default:
      return state;
  }
};
