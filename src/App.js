import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [text, setText] = useState("");
  const [color, setColor] = useState('black');

  const handleUppercase = () => {
    setText(text.toUpperCase());
  };

  const handleLowercase = () => {
    setText(text.toLowerCase());
  };

  const handleReverse = () => {
    setText(text.split("").reverse().join(""));
  };

  const colorChange = () => {
    setColor(color === 'orange' ? 'black' : 'red');
  };

  return (
    <>
      <Navbar />
      <center>
        <div className="App">
          <header className="App-header">
            <h1>Text Converter</h1>
            <textarea
              style={{
                color: color,  // Apply color state here
                width: "50%",
                height: "200px",
                padding: "10px",
                fontSize: "16px",
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here..."
            />
            <div className="buttons my-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUppercase}
              >
                Uppercase
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={handleLowercase}
              >
                Lowercase
              </button>
              <button
                type="button"
                className="btn btn-success mx-2"
                onClick={handleReverse}
              >
                Reverse
              </button>
              <button
                type="button"
                className="btn btn-danger mx-2"
                onClick={colorChange}
              >
                Color Change
              </button>
            </div>
          </header>
        </div>
      </center>
    </>
  );
}

export default App;
