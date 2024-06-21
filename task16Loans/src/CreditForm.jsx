// CreditForm.js
import React, { useState } from "react";

const CreditForm = ({ addCredit }) => {
  const [amount, setAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [startDate, setStartDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCredit({ amount, interestRate, loanTerm, startDate });
    setAmount(0);
    setInterestRate(0);
    setLoanTerm(0);
    setStartDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Initial Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.valueAsNumber)}
        />
      </label>
      <label>
        Annual Interest Rate (%):
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.valueAsNumber)}
        />
      </label>
      <label>
        Loan Term (months):
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.valueAsNumber)}
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

export default CreditForm;
