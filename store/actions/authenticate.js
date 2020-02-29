import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const FORGOTPASS = 'FORGOTPASS';

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token};

};

export const signup = (fullname, email, phonenumber, password, matchingpass, role) => {
  return async dispatch => {
    const response = await fetch(
      'https://192.168.43.52:8443/authenticate/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: fullname,
          email: email,
          phoneNumber: phonenumber,
          password: password,
          matchingPassword: matchingpass,
          roles: role,
        })
      }
    );

    if (response.subErrors) {
      const errorResData = await response.json();
      errorId = errorResData.subErrors.field;
      console.log(errorResData);
      console.log(errorId);
      let message = 'Something went wrong!';
      if(errorId === 'phoneNumber') {
        message = errorResData.subErrors.message;
      }
      else if(errorId === 'email') {
        message = errorResData.subErrors.message;
      }
      else if(errorId === 'password') {
        message = errorResData.subErrors.message;
      }
      else if(errorId === 'matchingPassword') {
        message = errorResData.subErrors.message;
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP, isOkay: resData.isOkay });
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};


export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
        'https://192.168.43.52:8443/authenticate/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      let message = errorResData.message;
      throw new Error(message);
    }
    console.log(JSON.stringify(response));
    const resData = await response.json();
    console.log(JSON.stringify(resData));
    dispatch({ type: LOGIN, token: resData.jwtToken });
    //const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.jwtToken);
    // saveDataToStorage(resData.jwtToken, resData.localId, expirationDate);
  };
};
  export const logout = () => {
    return { type: LOGOUT };
  }

  export const forgotpass = (email) => {
    return async dispatch => {
      const response = await fetch(
        'http://192.168.43.52:8080/authenticate/forgotPassword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
          })
        }
      );
  
      if (!response.ok) {
        const errorResData = await response.json();
        let message = errorResData.message;        
        throw new Error(message);
      }
  
      const resData = await response.json();
      console.log(resData);
      dispatch({ type: FORGOTPASS, sprava: resData});
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