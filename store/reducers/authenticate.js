import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT, FORGOTPASS } from '../actions/authenticate';

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
        };
        case SIGNUP:
        return {
            isOkay: action.isOkay

        };
        case FORGOTPASS:
            return {
                sprava: action.sprava
            }
        default:
            return state;



    }

}
