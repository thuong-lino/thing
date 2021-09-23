import api from './api';
import { updateObject } from './utils';

const EXPIRY_AGE = 3600 * 24 * 7; // 24 hours
// Action types
const types = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',

  SIGNUP_START: 'SIGNUP_START',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAIL: 'SIGNUP_FAIL',

  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  AUTH_CHECK_STATE: 'AUTH_CHECK_STATE',
  AUTO_SIGN_IN: 'AUTO_SIGN_IN',
};
//actions
const authStart = () => {
  return {
    type: types.LOGIN_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    user,
  };
};

const authFail = (error) => {
  return {
    type: types.LOGIN_FAIL,
    error: error,
  };
};
const logout = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};
const doLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('user');
    const res = api.post('/rest-auth/logout/');
    dispatch(logout());
  };
};
const authLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const res = await api.post('/rest-auth/login/', { email: email, password: password });
      console.log(res.data);
      const user = {
        token: res.data.key,
        firstname: res.data.firstname.firstname,
        userID: res.data.user,
        is_teacher: res.data.user_type.is_teacher,
        expirationDate: new Date(new Date().getTime() + EXPIRY_AGE * 1000),
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(authSuccess(user));
    } catch (error) {
      dispatch(authFail());
    }
  };
};
const authSignup = (firstname, lastname, email, password1, password2, is_teacher) => {
  return async (dispatch) => {
    dispatch({ type: types.SIGNUP_START });
    try {
      const user = {
        firstname,
        lastname,
        email,
        password1,
        password2,
        is_teacher,
      };
      const res = await api.post('/rest-auth/registration/', user);
      console.log(res.data);
      const userRes = {
        token: res.data.key,
        firstname,
        userID: res.data.user,
        is_teacher,
        expirationDate: new Date(new Date().getTime() + 36000 * 1000),
      };
      localStorage.setItem('user', JSON.stringify(userRes));
      dispatch({
        type: types.SIGNUP_SUCCESS,
        user: userRes,
      });
    } catch (err) {
      dispatch({ type: types.SIGNUP_FAIL, err });
    }
  };
};

// Action creators
export const creators = {
  authLogin: authLogin,
  authLogout: doLogout,
  authSignup: authSignup,
};

// Reducer
const initialState = {
  token: null,
  is_teacher: null,
  firstname: null,
  userID: null,
  error: null,
  loading: false,
};
const loginStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    is_teacher: action.user.is_teacher,
    firstname: action.user.firstname,
    userID: action.user.userID,
    error: null,
    loading: false,
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
      return loginStart(state, action);
    case types.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case types.LOGIN_FAIL:
      return loginFail(state, action);

    case types.LOGOUT_SUCCESS:
      return authLogout(state, action);

    case types.SIGNUP_START:
      return updateObject(state, {
        error: null,
        loading: true,
      });
    case types.SIGNUP_SUCCESS:
      return updateObject(state, {
        loading: false,
        token: action.user.token,
        username: action.user.username,
        is_teacher: action.user.is_teacher,
        userID: action.user.userID,
        error: null,
        loading: false,
      });
    case types.SIGNUP_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.err,
      });

    default:
      return state;
  }
};
