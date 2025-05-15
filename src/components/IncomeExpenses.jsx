import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '$ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const IncomeExpenses = ({ text, amount }) => {
  const { transactions, addTransaction } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  );

  // Handler for adding income
  const handleIncomeClick = () => {
    if (!text || !amount) return;
    addTransaction({
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: Math.abs(Number(amount)),
    });
  };

  // Handler for adding expense
  const handleExpenseClick = () => {
    if (!text || !amount) return;
    addTransaction({
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: -Math.abs(Number(amount)),
    });
  };

  return (
    <div className="inc-exp-container">
      <div
        style={{
          backgroundColor: 'darkgreen',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleIncomeClick}
      >
        <h4>Income</h4>
        <p className="money plus">{moneyFormatter(income)}</p>
      </div>
      <div
        style={{
          backgroundColor: 'darkred',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleExpenseClick}
      >
        <h4>Expense</h4>
        <p className="money minus">{moneyFormatter(expense)}</p>
      </div>
    </div>
  );
};




