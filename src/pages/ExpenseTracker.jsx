import  { useState, useEffect } from 'react';
import '../components/Expense/Expense.css';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses, addExpense } from '../../store/Expensereducers';
import axios from 'axios';
import { toggleTheme } from '../../store/themeSlice';
import { CSVLink } from 'react-csv';


function ExpenseTracker() {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [activatelink, setActivatelink] = useState(false)

  const activte =()=>{
    setActivatelink(prev => !prev)
  }

  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.expenses);
  const showPremiumButton = useSelector(state => state.expenses.showPremiumButton);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const csvData = expenses.map(expense => ({
    MoneySpent: expense.moneySpent,
    Description: expense.description,
    Category: expense.category
  }));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://full-expensetracker-default-rtdb.firebaseio.com/expense.json");
        if (response.data) {
          const fetchedExpenses = Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key]
          }));
          dispatch(setExpenses(fetchedExpenses));
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpense = {
      moneySpent: moneySpent,
      description: description,
      category: category
    };
    try {
      const response = await axios.post("https://full-expensetracker-default-rtdb.firebaseio.com/expense.json", newExpense);
      dispatch(addExpense({ id: response.data.name, ...newExpense }));
      setMoneySpent('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`https://full-expensetracker-default-rtdb.firebaseio.com/expense/${id}.json`);
      // dispatch delete action here if needed
      dispatch(setExpenses(expenses.filter(expense => expense.id !== id)));

    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = (expense) => {
    setEditId(expense.id);
    setCategory(expense.category);
    setDescription(expense.description);
    setMoneySpent(expense.moneySpent);
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    const updatedExpense = {
      category: category,
      description: description,
      moneySpent: moneySpent,
    };

    try {
      await axios.put(`https://full-expensetracker-default-rtdb.firebaseio.com/expense/${editId}.json`, updatedExpense);
      // dispatch update action here if needed
      setMoneySpent('');
      setDescription('');
      setCategory('');
      setEditId(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    
    <div className={isDarkTheme?'dark-ExpenseForm': 'ExpenseForm'}>
      <h2>Add Daily Expense</h2>
      <form onSubmit={editId ? handleUpdateExpense : handleAddExpense}>
        <div className="form-group">
          <label htmlFor="moneySpent">Money Spent:</label>
          <input
            type="number"
            id="moneySpent"
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button type="submit">{editId ? 'Update Expense' : 'Add Expense'}</button>
      </form>
     
      <div className="ExpenseList">
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <strong>Money Spent:</strong> {expense.moneySpent},{' '}
              <strong>Description:</strong> {expense.description},{' '}
              <strong>Category:</strong> {expense.category}
              <button onClick={() => handleEditExpense(expense)}>Edit</button>
              <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {showPremiumButton && (
        <button onClick={activte}>Activate Premium</button>
      )}
      {activatelink && (
        <div>
        <CSVLink data={csvData} filename={"expenses.csv"}>Download Expenses</CSVLink>  <button onClick={handleToggleTheme}>Toggle Theme</button>
        </div>
        )
        
        }
    </div>

    
    
  );
}

export default ExpenseTracker;