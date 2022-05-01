import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    axios
      .get("https://api.coinstats.app/public/v1/coins?skip=0")
      .then((reponse) => {
        setListOfCoins(reponse.data.coins);
        console.log(reponse.data);
      });
    
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      {/* header */}
      <div className="cryptoHeader">
        <h1 className="headerText">Search for any crypto:</h1>
        <input
          type="text"
          placeholder="Biticoin..."
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </div>
      {/* mainscreen display */}
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              rank={coin.rank}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
