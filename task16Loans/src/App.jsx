// App.js
import React, { useState } from "react";
import Credit from "./Credit";
import "./App.css";

const App = () => {
  const [credits, setCredits] = useState([]);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);

  const addCredit = (credit) => {
    setCredits([...credits, credit]);
    setTotalMonthlyPayment(totalMonthlyPayment + credit.monthlyPayment);
  };

  const calculateFutureBills = () => {
    const futureBills = [];
    credits.forEach((credit) => {
      const startDate = new Date(credit.startDate);
      const today = new Date();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();
      if (startDate > today) {
        month = startDate.getMonth() + 1;
        year = startDate.getFullYear();
      }
      for (let i = 0; i < credit.loanTerm; i++) {
        futureBills.push({ month, year, amount: credit.monthlyPayment });
        month++;
        if (month > 12) {
          month = 1;
          year++;
        }
      }
    });
    return futureBills;
  };

  const futureBills = calculateFutureBills();

  return (
    <div className="app">
      <h1>Credit Bill Manager</h1>
      <Credit onAddCredit={addCredit} />
      <h2>Total Monthly Payment: ${totalMonthlyPayment.toFixed(2)}</h2>
      <h2>Future Bills:</h2>
      <ul>
        {futureBills.map((bill, index) => (
          <li key={index}>
            {bill.month}/{bill.year}: ${bill.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
