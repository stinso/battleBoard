import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import { reducer as accountReducer } from 'src/slices/account';
import { reducer as priceReducer } from 'src/slices/price';
import { reducer as stakingInfoReducer } from 'src/slices/stakingInfo';
import { reducer as latestTransactionsReducer } from 'src/slices/latestTransactions';

const rootReducer = combineReducers({
  form: formReducer,
  account: accountReducer,
  price: priceReducer,
  stakingInfo: stakingInfoReducer,
  latestTransactions: latestTransactionsReducer
});

export default rootReducer;
