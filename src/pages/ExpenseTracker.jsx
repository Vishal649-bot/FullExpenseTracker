import  { useState } from 'react';
import '../components/Expense/Expense.css'
function ExpenseTracker() {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      moneySpent: moneySpent,
      description: description,
      category: category
    };
    // Update expenses array with new expense
    setExpenses([...expenses, newExpense]);
    // Clear form fields after adding expense
    setMoneySpent('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="ExpenseForm">
      <h2>Add Daily Expense</h2>
      <form onSubmit={handleAddExpense}>
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
        <button type="submit">Add Expense</button>
      </form>

      <div className="ExpenseList">
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <strong>Money Spent:</strong> {expense.moneySpent},{' '}
              <strong>Description:</strong> {expense.description},{' '}
              <strong>Category:</strong> {expense.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpenseTracker;
