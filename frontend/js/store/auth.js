import api from './api';
import { updateObject } from './utils';

// Action types
const types = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',

  LOGOUT_START: 'LOGOUT_START',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'LOGOUT_FAIL',
};

// Action creators
export const creators = {
  authLogin: (email, password) => {
    return async (dispatch) => {
      dispatch({ type: types.LOGIN_START });
      try {
        const res = await api.post('/api/user/login/', { email: email, password: password });
        dispatch({ type: types.LOGIN_SUCCESS, data: res.data });
        localStorage.setItem('user', res.data);
      } catch (error) {
        dispatch({ type: types.LOGIN_FAIL, error });
      }
    };
  },
  authLogout: () => {
    return async (dispatch) => {
      dispatch({ type: types.LOGOUT_START });
      try {
        const res = await api.post('/api/user/logout/');
        dispatch({ type: types.LOGOUT_SUCCESS, data: res.data });
        localStorage.clear();
      } catch (error) {
        dispatch({ type: types.LOGIN_FAIL, error });
      }
    };
  },
};

// Reducer
const initialState = {
  user: null,
  loading: false,
  error: null,
};
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
      return updateObject(state, {
        loading: true,
      });
    case types.LOGIN_SUCCESS:
      return updateObject(state, {
        user: action.data,
        loading: false,
      });
    case types.LOGIN_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });

    case types.LOGOUT_START:
      return updateObject(state, {
        loading: false,
      });
    case types.LOGOUT_SUCCESS:
      return updateObject(state, {
        status: action.data,
        user: null,
        loading: false,
      });
    case types.LOGOUT_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};
