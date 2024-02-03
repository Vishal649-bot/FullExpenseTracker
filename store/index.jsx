import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth';
import expensesReducer  from './Expensereducers';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer,
  },
});

export default store;


//akum5991@gmail.com