// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState } from "react";

export default function App() {
  const [amountForExchange, setAmountForExchange] = useState("");

  return (
    <div>
      <input
        type="number"
        value={amountForExchange}
        onChange={(e) => setAmountForExchange(e.target.value)}
      />
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{amountForExchange}</p>
    </div>
  );
}
