import { CURRENT_PLATE } from '../actions/types';

export default ( state={}, action ) => {
  switch (action.type) {
    case CURRENT_PLATE:
      return { ...state, currentPlate: action.plate}

    default:
      return state;
  }

}
