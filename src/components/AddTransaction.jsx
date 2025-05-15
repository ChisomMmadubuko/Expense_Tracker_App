import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);

  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  // Reusable function to add a transaction
  const addNewTransaction = (amt) => {
    if (!text || !amt) return; // Prevent empty submissions

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amt, // Convert string to number
    };

    addTransaction(newTransaction);
    setText('');
    setAmount(0);
  };

  // Button submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTransaction(amount);
  };

  // Handlers for income/expense boxes
  const handleIncomeClick = () => addNewTransaction(Math.abs(amount));
  const handleExpenseClick = () => addNewTransaction(-Math.abs(amount));

  return (
    <div>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br /> (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        {/* <button className="btn">Add transaction</button> */}
      </form>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <div
          className="income-box"
          style={{ background: '#d4edda', padding: '10px', cursor: 'pointer' }}
          onClick={handleIncomeClick}
        >
          Income
        </div>
        <div
          className="expense-box"
          style={{ background: '#f8d7da', padding: '10px', cursor: 'pointer' }}
          onClick={handleExpenseClick}
        >
          Expense
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
// ...existing code...

