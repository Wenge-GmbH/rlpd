import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import plateReducer from './plate-reducer';
import authReducer from './auth-reducer';

const rootReducer = combineReducers({
  plate: plateReducer,
  auth: authReducer,
  form: formReducer,
})

export default rootReducer;
