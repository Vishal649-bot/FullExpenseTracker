import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth';
import expensesReducer  from './Expensereducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
  },
});

export default store;


//akum5991@gmail.com