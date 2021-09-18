import api from './api';
import { updateObject } from './utils';

const EXPIRY_AGE = 3600 * 24 * 7; // 24 hours
// Action types
const types = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',

  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};
//actions
const authStart = () => {
  return {
    type: types.LOGIN_START,
  };
};

const authSuccess = (user) => {
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
const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(authSuccess(user));
      dispatch(checkAuthTimeout(EXPIRY_AGE));
    } catch (error) {
      dispatch(authFail());
    }
  };
};
const authCheckState = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === undefined || user === null) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};
// Action creators
export const creators = {
  authLogin: authLogin,
  authLogout: logout,
  authCheckState: authCheckState,
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

    default:
      return state;
  }
};
