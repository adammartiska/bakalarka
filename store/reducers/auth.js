import {
  LOGIN,
  SIGNUP,
  AUTHENTICATE,
  LOGOUT,
  FORGOTPASS,
  LOGINMYAPP,
  REDUXDATA
} from '../actions/auth';

const initialState = {
  token: 'token nezmeneny napr',
  userId: null,
  fullname: '',
  phonenumber: '',
  ridesCompleted: '',
  startDate: null,
  relationId: null,
  relations: []
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
        relations: action.relations
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
    case REDUXDATA:
      return {
        ...state,
        userInfo: action.userInfo,
        relationId: action.relationId
      };
    default:
      return state;
  }
};
