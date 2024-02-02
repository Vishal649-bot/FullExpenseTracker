import  { useState, useEffect } from 'react';
import '../components/Expense/Expense.css';
import axios from 'axios';

function ExpenseTracker() {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://full-expensetracker-default-rtdb.firebaseio.com/expense.json");
        if (response.data) {
          const fetchedExpenses = Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key]
          }));
          setExpenses(fetchedExpenses);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpense = {
      moneySpent: moneySpent,
      description: description,
      category: category
    };
    try {
      const response = await axios.post("https://full-expensetracker-default-rtdb.firebaseio.com/expense.json", newExpense);
      setExpenses([...expenses, { id: response.data.name, ...newExpense }]);
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
      setExpenses(expenses.filter(expense => expense.id !== id));
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
    e.preventDefault()
    const updatedExpense = {
      category: category,
      description: description,
      moneySpent: moneySpent,
    };
    console.log('baby');
    
     const res =  await axios.put(`https://full-expensetracker-default-rtdb.firebaseio.com/expense/${editId}.json`, updatedExpense);
     console.log('====================================');
     console.log(res);
     console.log('====================================');
      // const updatedExpenses = expenses.map(expense =>
      //   expense.id === editId ? { ...expense, ...updatedExpense } : expense
      // );
      // setExpenses(updatedExpenses);
      setMoneySpent('');
      setDescription('');
      setCategory('');
      setEditId(null);
    
  };

  return (
    <div className="ExpenseForm">
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
    </div>
  );
}

export default ExpenseTracker;
