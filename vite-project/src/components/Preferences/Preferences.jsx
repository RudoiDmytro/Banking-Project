import React, { useEffect, useState } from "react";
import "./Preferences.css";
import generator from "creditcard-generator";
import Button from "@mui/material/Button";

export default function Preferences() {
  const [currency, setCurrency] = useState({
    date: " ",
    currency: {},
    txt: " ",
  });
  const [cards, setCards] = useState([]);

  async function getExchange() {
    return fetch(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    )
      .then((data) => {
        return data.json();
      })
      .then(function (myJson) {
        let currency = [25, 32, 1, 4, 22, 24];
        let cur = ["USD", "EUR", "CAD", "CZK", "CHF", "GBP"];
        let arr = {};
        for (let i = 0; i < currency.length; i++) {
          arr[cur[i]] = myJson[currency[i]].rate.toFixed(2);
        }
        setCurrency({
          date: myJson[0].exchangedate,
          currency: arr,
        });
      });
  }
  function getCards() {
    const card = generator.GenCC("VISA", 1);
    setCards([...cards, card]);
  }
  useEffect(() => {
    getExchange();
  }, []);
  return (
    <>
      <div className="container">
        <div className="box-1">Exchange rates for {currency.date}</div>
        <div className="box-2">
          {Object.keys(currency.currency).map((data, i) => {
            return (
              <div key={data}>
                {data}: {currency.currency[data]}
              </div>
            );
          })}
        </div>
      </div>
      <Button
        color="warning"
        size="large"
        variant="contained"
        onClick={getCards}
      >
        Generate
      </Button>
      <ul>
        {Array.from(cards).map((card, i) => {
          return <li key={i}>{card}</li>;
        })}
      </ul>
    </>
  );
}
