import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const FORGOTPASS = 'FORGOTPASS';

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token};

};

export const signup = (fullname, email, phonenumber, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiqLlRCDS9oROWbMbaTGZ0jXEDpRvRjjc',
      //'https://169.254.251.4:8443/authenticate/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullname: fullname,
          email: email,
          phonenumber: phonenumber,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      errorId = errorResData.error.message;
      console.log(errorResData);
      console.log(errorId);
      let message = 'Something went wrong!';
      if(errorId === 'EMAIL_EXISTS') {
        message = 'Entered email already exists!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};


export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBiqLlRCDS9oROWbMbaTGZ0jXEDpRvRjjc',
      //'http://169.254.251.4:8080/authenticate/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if(errorId === 'EMAIL_NOT_FOUND') {
        message = 'Entered email not found!';
      }
      else if(errorId === 'INVALID_PASSWORD') {
        message = 'Entered password is not valid!';
      }
      throw new Error(message);
    }
    console.log(JSON.stringify(response));
    const resData = await response.json();
    console.log(JSON.stringify(resData));
    dispatch({ type: LOGIN, token: resData.token, userId: resData.id });
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};
export const casy = (date, time) => {
  return async dispatch => {
    const response = await fetch(
      'http://169.254.251.4:8080/instructor/addRide',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWthc0BnbWFpbC5jb20iLCJleHAiOjE1ODMzNTcyOTMsImlhdCI6MTU4MzM1Mzk5M30.nDVJHMMUnCxSOTdQkIWjXy9ll-vyns56Zos6tyOZoZY',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: "2020-02-13",
          time: "13:00",
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if(errorId === 'EMAIL_NOT_FOUND') {
        message = 'Entered email not found!';
      }
      else if(errorId === 'INVALID_PASSWORD') {
        message = 'Entered password is not valid!';
      }
      throw new Error(message);
    }
    console.log(JSON.stringify(response));
    const resData = await response.json();
    console.log(JSON.stringify(resData));
    dispatch({ type: LOGIN, token: resData.token, userId: resData.id });
    /*const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);*/
  };
};

  export const logout = () => {
    return { type: LOGOUT };
  }

  export const forgotpass = (email) => {
    return async dispatch => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBiqLlRCDS9oROWbMbaTGZ0jXEDpRvRjjc',
        //'http://192.168.43.52:8080/authenticate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: email,
          })
        }
      );
  
      if (!response.ok) {
        const errorResData = await response.json();
        errorId = errorResData.error.message;
        console.log(errorResData);
        console.log(errorId);
        let message = 'Something went wrong!';
        if(errorId === 'EMAIL_EXISTS') {
          message = 'Entered email already exists!';
        }
        throw new Error(message);
      }
  
      const resData = await response.json();
      console.log(resData);
      dispatch({ type: FORGOTPASS, email: resData.email});
      //const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
      //saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
  };

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expiryDate: expirationDate.toISOString()
  }));
}
/*token: resData.idToken, userId: resData.localId */


/*
export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'http://169.254.251.4:8080/authenticate/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          //returnSecureToken: true
        })
      }
    );
    console.log('posielam')

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if(errorId === 'EMAIL_NOT_FOUND') {
        message = 'Entered email not found!';
      }
      else if(errorId === 'INVALID_PASSWORD') {
        message = 'Entered password is not valid!';
      }
      throw new Error(message);
    }
    console.log(JSON.stringify(response));
    const resData = await response.json();
    console.log(JSON.stringify(resData));
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
}; */
// 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBiqLlRCDS9oROWbMbaTGZ0jXEDpRvRjjc',