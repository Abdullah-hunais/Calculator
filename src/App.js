import React from "react";
import AutoComplete from "./AutoComplete";
import "./styles.css";
import { countries } from "./Values";

const App = () => {
  return (
    <div>
      <AutoComplete
        suggestions={countries
          .split("\n")
          .map((country) => country.split(",")[0])}
      />
    </div>
  );
};

export default App;
