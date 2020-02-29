import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT, FORGOTPASS } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
};


export default(state = initialState, action) => {
    switch(action.type){
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
        case SIGNUP:
        return {
            token: action.token,
            userId: action.userId

        };
        case FORGOTPASS:
            return {
                email: action.email
            }
        default:
            return state;



    }

}
