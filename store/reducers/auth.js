import {
  LOGIN,
  SIGNUP,
  AUTHENTICATE,
  LOGOUT,
  FORGOTPASS,
  LOGINMYAPP
} from '../actions/auth';

const initialState = {
  token: null,
  userId: null
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
        userId: action.userId,
        fullname: action.fullname,
        phonenumber: action.phonenumber,
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
