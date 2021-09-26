import api from './api';
import { updateObject } from './utils';

export const types = {
  CREATE_ASSIGNMENT_START: 'CREATE_ASSIGNMENT_START',
  CREATE_ASSIGNMENT_SUCCESS: 'CREATE_ASSIGNMENT_SUCCESS',
  CREATE_ASSIGNMENT_FAIL: 'CREATE_ASSIGNMENT_FAIL',
};

const createASNT = (token, asnt) => {
  return (dispatch) => {
    dispatch({
      type: types.CREATE_ASSIGNMENT_START,
    });
    api.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
    api
      .post(`/api/assignments/`, asnt)
      .then((res) => {
        dispatch({
          type: types.CREATE_ASSIGNMENT_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.CREATE_ASSIGNMENT_FAIL,
          error: err,
        });
      });
  };
};

export const creators = {
  createASNT: createASNT,
};

// reducers
const initialState = {
  success: null,
  error: null,
  loading: false,
};

const createASNTStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const createASNTSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    success: true,
  });
};

const createASNTFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

export const assignments = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ASSIGNMENT_START:
      return createASNTStart(state, action);
    case types.CREATE_ASSIGNMENT_SUCCESS:
      return createASNTSuccess(state, action);
    case types.CREATE_ASSIGNMENT_FAIL:
      return createASNTFail(state, action);
    default:
      return state;
  }
};
