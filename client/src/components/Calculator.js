import React, { useState } from "react";
import "../App.css";

import hist_icon from "../Icons/clock.png";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [res, setRes] = useState(false);

  const [history, setHistory] = useState([]);

  const handleClick = (e) => {
    if (res) {
      alert("Please clear the input and try again");
      return;
    }
    let variable_expression;

    if (
      expression.length === 0 &&
      (e.target.innerHTML === "÷" ||
        e.target.innerHTML === "×" ||
        e.target.innerHTML === "+" ||
        e.target.innerHTML === "-" ||
        e.target.innerHTML === "%")
    )
      return;

    if (
      expression.length !== 0 &&
      (e.target.innerHTML === "÷" ||
        e.target.innerHTML === "×" ||
        e.target.innerHTML === "+" ||
        e.target.innerHTML === "-" ||
        e.target.innerHTML === "%") &&
      (expression[expression.length - 2] === "÷" ||
        expression[expression.length - 2] === "×" ||
        expression[expression.length - 2] === "+" ||
        expression[expression.length - 2] === "-" ||
        expression[expression.length - 2] === "%")
    ) {
      return;
    }
    if (e.target.innerHTML === "÷") {
      variable_expression = expression + " ÷ ";
    } else if (e.target.innerHTML === "×") {
      variable_expression = expression + " × ";
    } else if (e.target.innerHTML === "+") {
      variable_expression = expression + " + ";
    } else if (e.target.innerHTML === "-") {
      variable_expression = expression + " - ";
    } else if (e.target.innerHTML === "%") {
      variable_expression = expression + " % ";
    } else if (e.target.innerHTML === "(") {
      variable_expression = expression + " ( ";
    } else if (e.target.innerHTML === ")") {
      variable_expression = expression + " ) ";
    } else {
      variable_expression = expression + e.target.innerHTML;
    }

    setExpression(variable_expression);
  };

  const handleOnChange = (e) => {
    setExpression(e.target.value);
  };

  const handleClear = (e) => {
    setRes(false);
    setExpression("");
  };

  const handleBackSpace = (e) => {
    if (expression.length === 0) return;
    let nextexp;
    if(expression[expression.length - 1] === " ")
      nextexp = expression.slice(0, expression.length - 3);
    else nextexp = expression.slice(0, expression.length - 1);
    setExpression(nextexp);
  };

  // Step 1: Check if a character is an operator
  function isOperator(char) {
    return ["+", "-", "÷", "×", "%"].includes(char);
  }

  // Step 2: Get the precedence of an operator
  function getPrecedence(operator) {
    switch (operator) {
      case "+":
      case "-":
        return 1;
      case "÷":
      case "×":
      case "%":
        return 2;
      default:
        return 0;
    }
  }

  // Step 3: Shunting Yard algorithm to convert infix to postfix
  function infixToPostfix(expression) {
    const outputQueue = [];
    const operatorStack = [];
    const tokens = expression.split(" ");

    for (const token of tokens) {
      if (!isNaN(token)) {
        // If token is a number, add to the output queue
        outputQueue.push(parseFloat(token));
      } else if (isOperator(token)) {
        // If token is an operator
        while (
          operatorStack.length > 0 &&
          getPrecedence(operatorStack[operatorStack.length - 1]) >=
            getPrecedence(token)
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      }
    }

    // Pop any remaining operators in the operator stack to the output queue
    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }
    console.log(...outputQueue);
    return outputQueue;
  }

  // Step 4: Evaluate the postfix expression
  function evaluatePostfix(postfixExpression) {
    const stack = [];

    for (const token of postfixExpression) {
      if (!isNaN(token)) {
        stack.push(token);
      } else if (isOperator(token)) {
        const operand2 = stack.pop();
        const operand1 = stack.pop();

        switch (token) {
          case "+":
            stack.push(operand1 + operand2);
            break;
          case "-":
            stack.push(operand1 - operand2);
            break;
          case "×":
            stack.push(operand1 * operand2);
            break;
          case "÷":
            stack.push(operand1 / operand2);
            break;
          case "%":
            stack.push(operand1 % operand2);
            break;
        }
      }
    }

    return stack.pop();
  }

  const handleCompute = (e) => {
    if (expression.length === 0 || res) return;
    const postfixExpression = infixToPostfix(expression);
    const result = evaluatePostfix(postfixExpression);

    setRes(true);
    setExpression(result + " ");
  };

  return (
    <div className="  custom-container bg-light">
      <div className="d-flex column">
        
        <textarea
          id="textarea"
          type="number"
          onChange={(e) => {
            handleOnChange(e);
          }}
          className="form-control position-relative text-left p-1"
          rows="2"
          value={expression}
        >
        
          {expression}
        </textarea>
        {/* <div className="position-absolute">
        <img className="img  bg-transparent p-1" src={hist_icon} alt="" />
        <span>hi</span>
        </div> */}
      </div>

      <div className="row  mt-2">
        <div className="form-group text-center">
          <button
            onClick={(e) => handleClick(e)}
            className="col  btn btn-custom"
          >
            (
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            )
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            %
          </button>
          <button
            onClick={(e) =>
              expression.length !== 0 && !res
                ? handleBackSpace(e)
                : handleClear(e)
            }
            className="col btn btn-danger  btn-custom"
          >
            {expression.length !== 0 && !res ? "CE" : "AC"}
          </button>
        </div>
      </div>

      <div className="row">
        <div className="form-group  text-center">
          <button
            onClick={(e) => handleClick(e)}
            className="col  btn btn-custom"
          >
            1
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            2
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            3
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            ÷
          </button>
        </div>
      </div>

      <div className="row">
        <div className="form-group text-center">
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            3
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            4
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            5
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            ×
          </button>
        </div>
      </div>

      <div className="row">
        <div className="form-group text-center">
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            7
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            8
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            9
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            -
          </button>
        </div>
      </div>

      <div className="row">
        <div className="form-group text-center">
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            0
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            .
          </button>
          <button
            onClick={(e) => handleCompute(e)}
            className="col btn btn-success btn-custom"
          >
            =
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className="col btn btn-custom"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
