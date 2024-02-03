// expensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  showPremiumButton: false
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
      state.showPremiumButton = calculateShowPremiumButton(action.payload);
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.showPremiumButton = calculateShowPremiumButton(state.expenses);
    }
  }
});

const calculateShowPremiumButton = (expenses) => {
  const totalExpense = expenses.reduce((total, expense) => total + Number(expense.moneySpent), 0);
  return totalExpense > 10000;
};

export const { setExpenses, addExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
