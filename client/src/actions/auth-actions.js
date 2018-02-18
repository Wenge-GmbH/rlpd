import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';
import { ROOT_URL } from './';

export const loginUser = ({ username, password }, callback) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/login`, { username, password })
      .then((res) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        callback('/logs');
      })
      .catch((e) => {
        dispatch(authError('Bad Login Info'));
      })
    ;
  }
}

const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
