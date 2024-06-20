import React, { useEffect, useState } from "react";
import "./Preferences.css";

export default function Preferences() {
  const [currency, setCurrency] = useState({
    date: " ",
    currency: {},
    txt: " ",
  });

  async function getExchange() {
    return fetch(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    )
      .then((data) => {
        return data.json();
      })
      .then(function (myJson) {
        let cur = ["USD", "EUR", "CAD", "CZK", "CHF", "GBP"].sort((a, b) =>
          a.localeCompare(b)
        );
        let arr = {};
        let arr2 = {};
        const json = myJson
          .filter((item) => cur.includes(item.cc))
          .sort((a, b) => a.cc.localeCompare(b.cc));

        for (let i = 0; i < cur.length; i++) {
          arr[cur[i]] = json[i].rate.toFixed(2);
          arr2[i] = json[i].txt;
        }

        setCurrency({
          date: myJson[0].exchangedate,
          currency: arr,
          txt: arr2,
        });
      });
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
                {currency.txt[i]}: {currency.currency[data]}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
