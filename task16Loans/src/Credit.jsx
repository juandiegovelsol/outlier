// Credit.js
import React, { useState } from "react";

const Credit = ({ onAddCredit }) => {
  const [initialAmount, setInitialAmount] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [startDate, setStartDate] = useState("");

  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    const monthlyPayment =
      (initialAmount *
        monthlyInterestRate *
        (1 + monthlyInterestRate) ** numberOfPayments) /
      ((1 + monthlyInterestRate) ** numberOfPayments - 1);
    return monthlyPayment;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const monthlyPayment = calculateMonthlyPayment();
    onAddCredit({
      initialAmount,
      annualInterestRate,
      loanTerm,
      startDate,
      monthlyPayment,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Initial Amount:
        <input
          type="number"
          value={initialAmount}
          onChange={(e) => setInitialAmount(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Annual Interest Rate (%):
        <input
          type="number"
          value={annualInterestRate}
          onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Loan Term (months):
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <button type="submit">Add Credit</button>
    </form>
  );
};

export default Credit;
