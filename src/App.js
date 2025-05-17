import { useState, useEffect } from "react";

export default function App() {
  const [amountForExchange, setAmountForExchange] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${currencyFrom}&symbols=${currencyTo}`
        );

        const data = await res.json();

        const convertedAmount = Number(
          (amountForExchange * data.rates[`${currencyTo}`]).toFixed(2)
        );

        setOutputAmount(convertedAmount);

        setIsLoading(false);
      }

      if (currencyFrom === currencyTo) {
        setOutputAmount(amountForExchange);
        return;
      }

      getCurrencyRate();
    },

    [amountForExchange, currencyFrom, currencyTo, isLoading]
  );

  return (
    <div>
      <input
        type="number"
        value={amountForExchange}
        onChange={(e) => handleAmountForExchange(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={currencyFrom}
        onChange={(e) => handleCurrencyFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyTo}
        onChange={(e) => handleCurrencyTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {outputAmount > 0 && (
        <p>
          {outputAmount} {currencyTo}
        </p>
      )}
    </div>
  );
}
