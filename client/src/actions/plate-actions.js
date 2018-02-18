import { CURRENT_PLATE } from './types';
import io from 'socket.io-client';

const socket = io('http://localhost:3002');

export const setCurentPlate = () => {
  return dispatch => {
    socket.on('current-plate', (data) => {
      console.log(data);
      dispatch({
        type: CURRENT_PLATE,
        plate: data.plate
      });
    })
  }
}
