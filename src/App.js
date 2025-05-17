import { useState, useEffect } from "react";

export default function App() {
  const [amountForExchange, setAmountForExchange] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("USD");

  function handleAmountForExchange(data) {
    setAmountForExchange(Number(data));
  }

  function handleCurrencyFrom(data) {
    setCurrencyFrom(data);
  }

  function handleCurrencyTo(data) {
    setCurrencyTo(data);
  }

  useEffect(
    function () {
      async function getCurrencyRate() {
        console.log(currencyFrom);
        console.log(currencyTo);

        if (currencyFrom === currencyTo) return;
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${currencyFrom}&symbols=${currencyTo}`
        );

        const data = await res.json();

        const convertedAmount = Number(
          (amountForExchange * data.rates[`${currencyTo}`]).toFixed(2)
        );

        setOutputAmount(convertedAmount);
      }
      getCurrencyRate();
    },
    [amountForExchange, currencyFrom, currencyTo]
  );

  return (
    <div>
      <input
        type="number"
        value={amountForExchange}
        onChange={(e) => handleAmountForExchange(e.target.value)}
      />
      <select
        value={currencyFrom}
        onChange={(e) => handleCurrencyFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyTo}
        onChange={(e) => handleCurrencyTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{outputAmount}</p>
    </div>
  );
}
