import { useState, useEffect } from "react";
import { table, countries, aboveTen, aboveFifteen } from "./Values";
import "./AutoComplete.css";
// import pic from "./hola.png";

const AutoComplete = ({ suggestions }) => {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState("c");
  const [weight, setWeight] = useState(0);
  //asd
  const [lkr, setLkr] = useState(" ");
  const [usd, setUsd] = useState(" ");
  const [fuel, setFuel] = useState("");
  const [Profit, setProfit] = useState("");
  const [Charge, setCharge] = useState("");
  const [cost, setCost] = useState("");

  const tableValues = table.split("\n");
  const countryZone = countries.split("\n");

  const findPrice = (country, weight) => {
    // console.log(country);
    // console.log(countryZone[1].split(",")[0]);
    // console.log(countryZone.filter((coun) => coun.split(",")[0] == country));
    const zone = Number(
      countryZone
        .filter((coun) => coun.split(",")[0] === country)[0]
        .split(",")[1]
    );
    if (weight <= 9.5) {
      for (let index = 0; index < tableValues.length; index++) {
        const row = tableValues[index].split(",");
        //console.log(row[zone]);
        // if (`${row[0]}` === weight) {
        if (row[0] === weight + "") {
          // console.log(row[zone]);
          return setValue(row[zone]);
        }
      }
    } else if (weight <= 14.5) {
      return setValue((aboveTen[zone - 1] / 10) * weight);
    } else {
      return setValue((aboveFifteen[zone - 1] / 15) * weight);
    }
  };
  const hideText = () => {
    setFuel(<b>Fuel Charge is :</b>);
    setCost(<b>Charging Amount: </b>);
    setProfit(<b>Profit Amount: </b>);
    setLkr("Rs");
    setUsd("$");
  };

  //up and down (Auto Suggtion)
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setCountry(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No Countries</em>
      </div>
    );
  };

  const clearState = () => {
    setFuel();
    setCost();
    setProfit();
    setUsd();
    setCountry();
    setWeight("");
    setInput("");
    setCountry();
  };
  // const twoCalls = (e) => {
  //   setWeight(Number(e.target.value));
  //   onChange();
  // };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <div className="head">
        <h1>Hola Global Courier Rates</h1>
        {/* <img src={pic} width="100" height="100" /> */}
      </div>
      <div className="home">
        Country:
        <div className="country">
          <input
            type="text"
            onChange={onChange}
            // onKeyDown={onKeyDown}
            value={input}
          />
          {showSuggestions && input && <SuggestionsListComponent />}
        </div>
        <br />
        Weight :
        <div className="weight">
          <input
            type="number"
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>
        <button
          onClick={(e) => {
            findPrice(country, weight);
            hideText();
          }}
        >
          Submit
        </button>
        <button onClick={refreshPage}>Clear</button>
        {/* <button
        onClick={(e) => {
          clearState();
        }}
      >
        Clear
      </button> */}
        <p>
          {fuel} {lkr + " "}
          {((value * 26) / 100) * 205}
        </p>
        <p>
          {Profit} {lkr + " "}
          {((value * 12) / 100) * 205}
        </p>
        <p id="cost">
          {cost} {lkr + " "}
          {(1 + 38 / 100) * value * 205}
        </p>
        <p>
          {usd + " "} {value}
        </p>
      </div>
    </div>
  );
};
export default AutoComplete;
