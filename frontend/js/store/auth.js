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
  localStorage.removeItem('user');
  return {
    type: types.LOGOUT_SUCCESS,
  };
};
const authLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const res = await api.post('/rest-auth/login/', { email: email, password: password });
      const user = {
        token: res.data.key,
        userID: res.data.user,
        is_teacher: res.data.user_type.is_teacher,
        expirationDate: new Date(new Date().getTime() + EXPIRY_AGE * 1000),
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(authSuccess(user));
      dispatch(checkAuthTimeout(EXPIRY_AGE));
    } catch (error) {
      dispatch(authFail());
    }
  };
};
const authSignup = (email, password1, password2, is_teacher) => {
  return async (dispatch) => {
    dispatch({ type: types.SIGNUP_START });
    try {
      const user = {
        email,
        password1,
        password2,
        is_teacher,
      };
      const res = await api.post('/rest-auth/registration/', user);
      const userRes = {
        token: res.data.key,
        email,
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
  authLogout: logout,
  authSignup: authSignup,
};

// Reducer
const initialState = {
  token: null,
  is_teacher: null,
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
    username: action.user.username,
    is_teacher: action.user.is_teacher,
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
