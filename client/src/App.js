import React, { useState } from "react";
import "./App.css";

function App() {
  // State to store the current calculation result
  const [result, setResult] = useState("");

  // Function to handle button clicks and update the result
  const handleClick = (e) => {
    setResult(result.concat(e.target.value));
  };

  // Function to clear the result
  const clear = (e) => {
    setResult("");
  };

  // Function to handle backspace and remove the characters
  const remove = (e) => {
    setResult(result.slice(0, -1));
  };

  // Function to evaluate the expression and update the result
  const resultvalue = (e) => {
    try {
      //'eval()' function evaluate the mathematical expression stored in the 'result' state
      setResult(eval(result).toString());
    } catch (error) {
      setResult("ERR!");
    }
  };

  return (
    <div className="container">
      <form>
        <input type="text" value={result} />
      </form>

      <div className="buttons">
        <button className="mainbtn" id="history">
          &#x23F0;
        </button>
        <button className="mainbtn" onClick={clear} id="clear">
          Clear
        </button>
        <button className="mainbtn" onClick={remove} id="backspace">
          C
        </button>
        <button className="mainbtn" value="/" onClick={handleClick}>
          &divide;
        </button>
        <button value="7" onClick={handleClick}>
          7
        </button>
        <button value="8" onClick={handleClick}>
          8
        </button>
        <button value="9" onClick={handleClick}>
          9
        </button>
        <button className="mainbtn" value="*" onClick={handleClick}>
          &times;
        </button>
        <button value="4" onClick={handleClick}>
          4
        </button>
        <button value="5" onClick={handleClick}>
          5
        </button>
        <button value="6" onClick={handleClick}>
          6
        </button>
        <button className="mainbtn" value="-" onClick={handleClick}>
          &ndash;
        </button>
        <button value="1" onClick={handleClick}>
          1
        </button>
        <button value="2" onClick={handleClick}>
          2
        </button>
        <button value="3" onClick={handleClick}>
          3
        </button>
        <button className="mainbtn" value="+" onClick={handleClick}>
          +
        </button>
        <button className="mainbtn" value="%" onClick={handleClick}>
          %
        </button>
        <button value="0" onClick={handleClick}>
          0
        </button>
        <button className="mainbtn" value="." onClick={handleClick}>
          &middot;
        </button>
        <button className="mainbtn" onClick={resultvalue} id="result">
          =
        </button>
      </div>
    </div>
  );
}

export default App;
