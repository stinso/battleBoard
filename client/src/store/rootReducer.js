import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import { reducer as accountReducer } from 'src/slices/account';

const rootReducer = combineReducers({
  form: formReducer,
  account: accountReducer
});

export default rootReducer;
