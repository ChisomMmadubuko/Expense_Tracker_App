import React, { useContext, useState, useEffect } from 'react';
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

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const [incomeBoxColor, setIncomeBoxColor] = useState('white');
  const [expenseBoxColor, setExpenseBoxColor] = useState('white');

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  );

  // Set the income box color to green on page load
  useEffect(() => {
    setIncomeBoxColor('darkgreen');
  }, []);

  return (
    <div className="inc-exp-container">
      <div
        style={{
          backgroundColor: incomeBoxColor,
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setIncomeBoxColor('darkgreen')}
        onDoubleClick={() => setIncomeBoxColor('white')}
      >
        <h4>Income</h4>
        <p className="money plus">{moneyFormatter(income)}</p>
      </div>
      <div
        style={{
          backgroundColor: expenseBoxColor,
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setExpenseBoxColor('darkred')}
        onDoubleClick={() => setExpenseBoxColor('white')}
      >
        <h4>Expense</h4>
        <p className="money minus">{moneyFormatter(expense)}</p>
      </div>
    </div>
  );
};




