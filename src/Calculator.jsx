import React, { useState } from "react";

// Safe evaluation function supporting +, -, *, / and BODMAS
const safeEval = (expr) => {
  try {
    // Replace all instances of double operators (like "--") if any
    expr = expr.replace(/--/g, "+");

    // Only allow digits, operators, parentheses, and decimal points
    if (/[^0-9+\-*/(). ]/.test(expr)) {
      return "Error";
    }

    // Use Function constructor safely
    const result = Function(`"use strict"; return (${expr})`)();
    return result;
  } catch {
    return "Error";
  }
};

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleEvaluate = () => {
    if (input.trim() === "") {
      setResult("Error");
      return;
    }
    const evalResult = safeEval(input);
    setResult(evalResult);
  };

  return (
    <div style={{ width: "250px", margin: "50px auto", textAlign: "center" }}>
        <h1>React Calculator</h1>
      <input
        type="text"
        value={input}
        placeholder="0"
        readOnly
        style={{
          width: "100%",
          height: "40px",
          marginBottom: "10px",
          fontSize: "18px",
          textAlign: "right",
          padding: "5px",
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {["7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "C", "0", "=", "+"].map((btn) => {
          if (btn === "C") {
            return (
              <button
                key={btn}
                onClick={handleClear}
                style={{ height: "40px", fontSize: "18px" }}
              >
                {btn}
              </button>
            );
          } else if (btn === "=") {
            return (
              <button
                key={btn}
                onClick={handleEvaluate}
                style={{ height: "40px", fontSize: "18px" }}
              >
                {btn}
              </button>
            );
          } else {
            return (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                style={{ height: "40px", fontSize: "18px" }}
              >
                {btn}
              </button>
            );
          }
        })}
      </div>

      <div
        style={{
          marginTop: "20px",
          height: "40px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {result !== "" && result}
      </div>
    </div>
  );
};

export default Calculator;
