import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [text, setText] = useState("");
  const [color, setColor] = useState('black');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textStats, setTextStats] = useState({
    vowels: 0,
    consonants: 0,
    numbers: 0,
    specialChars: 0,
    uniqueWords: 0,
    longestWord: '',
  });

  useEffect(() => {
    if (text) {
      calculateTextStats();
    }
  }, [text]);

  const calculateTextStats = () => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const uniqueWords = new Set(words.map(word => word.toLowerCase()));
    
    const vowels = (text.match(/[aeiou]/gi) || []).length;
    const consonants = (text.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;
    const specialChars = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
    
    const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, '');

    setTextStats({
      vowels,
      consonants,
      numbers,
      specialChars,
      uniqueWords: uniqueWords.size,
      longestWord,
    });
  };

  const handleUppercase = () => {
    setText(text.toUpperCase());
  };

  const handleLowercase = () => {
    setText(text.toLowerCase());
  };

  const handleReverse = () => {
    setText(text.split("").reverse().join(""));
  };

  const handleCapitalize = () => {
    setText(text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' '));
  };

  const handleClear = () => {
    setText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const handleRemoveExtraSpaces = () => {
    setText(text.replace(/\s+/g, ' ').trim());
  };

  const handleRemoveNumbers = () => {
    setText(text.replace(/[0-9]/g, ''));
  };

  const handleRemoveSpecialChars = () => {
    setText(text.replace(/[^a-zA-Z0-9\s]/g, ''));
  };

  const handleAlternateCase = () => {
    setText(text.split('').map((char, i) => 
      i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
    ).join(''));
  };

  const handleTitleCase = () => {
    setText(text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' '));
  };

  const handleInvertCase = () => {
    setText(text.split('').map(char => 
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    ).join(''));
  };

  const handleSortWords = () => {
    setText(text.split(' ').sort().join(' '));
  };

  const handleSortLines = () => {
    setText(text.split('\n').sort().join('\n'));
  };

  const handleRemoveDuplicates = () => {
    setText([...new Set(text.split(' '))].join(' '));
  };

  const handleAddLineNumbers = () => {
    setText(text.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n'));
  };

  const handleRemoveLineNumbers = () => {
    setText(text.replace(/^\d+\.\s*/gm, ''));
  };

  const colorChange = () => {
    setColor(color === 'black' ? '#2c3e50' : '#e74c3c');
  };

  const getReadingTime = () => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(words / 200);
    return readingTime;
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-lg">
              <div className="card-body">
                <h1 className="text-center mb-4 text-primary">Text Converter</h1>
                
                <div className="text-formatting mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Font Size</label>
                      <input
                        type="range"
                        className="form-range"
                        min="12"
                        max="32"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                      />
                      <span className="ms-2">{fontSize}px</span>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Font Family</label>
                      <select
                        className="form-select"
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    style={{
                      color: color,
                      minHeight: "200px",
                      fontSize: `${fontSize}px`,
                      fontFamily: fontFamily,
                      borderRadius: "8px",
                      border: "2px solid #e9ecef",
                      transition: "all 0.3s ease",
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your text here..."
                  />
                </div>
                
                <div className="feature-buttons mt-4">
                  <h5 className="mb-3">Text Transformations</h5>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary" onClick={handleUppercase}>Uppercase</button>
                    <button className="btn btn-secondary" onClick={handleLowercase}>Lowercase</button>
                    <button className="btn btn-success" onClick={handleCapitalize}>Capitalize</button>
                    <button className="btn btn-info" onClick={handleTitleCase}>Title Case</button>
                    <button className="btn btn-warning" onClick={handleAlternateCase}>Alternate Case</button>
                    <button className="btn btn-danger" onClick={handleInvertCase}>Invert Case</button>
                  </div>

                  <h5 className="mb-3 mt-4">Text Cleaning</h5>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-warning" onClick={handleRemoveExtraSpaces}>Remove Extra Spaces</button>
                    <button className="btn btn-danger" onClick={handleRemoveNumbers}>Remove Numbers</button>
                    <button className="btn btn-dark" onClick={handleRemoveSpecialChars}>Remove Special Characters</button>
                    <button className="btn btn-info" onClick={handleRemoveDuplicates}>Remove Duplicates</button>
                  </div>

                  <h5 className="mb-3 mt-4">Text Organization</h5>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary" onClick={handleSortWords}>Sort Words</button>
                    <button className="btn btn-secondary" onClick={handleSortLines}>Sort Lines</button>
                    <button className="btn btn-success" onClick={handleAddLineNumbers}>Add Line Numbers</button>
                    <button className="btn btn-warning" onClick={handleRemoveLineNumbers}>Remove Line Numbers</button>
                  </div>

                  <h5 className="mb-3 mt-4">Actions</h5>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-outline-primary" onClick={handleCopy}>Copy Text</button>
                    <button className="btn btn-outline-danger" onClick={handleClear}>Clear Text</button>
                    <button className="btn btn-outline-secondary" onClick={colorChange}>Toggle Color</button>
                  </div>
                </div>

                {text && (
                  <div className="mt-4 p-3 bg-light rounded">
                    <h5 className="mb-3">Text Analysis</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-2">Characters: {text.length}</p>
                        <p className="mb-2">Words: {text.trim().split(/\s+/).filter(Boolean).length}</p>
                        <p className="mb-2">Lines: {text.split('\n').length}</p>
                        <p className="mb-2">Vowels: {textStats.vowels}</p>
                        <p className="mb-2">Consonants: {textStats.consonants}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-2">Reading Time: {getReadingTime()} minute(s)</p>
                        <p className="mb-2">Sentences: {text.split(/[.!?]+/).filter(Boolean).length}</p>
                        <p className="mb-2">Paragraphs: {text.split(/\n\s*\n/).filter(Boolean).length}</p>
                        <p className="mb-2">Unique Words: {textStats.uniqueWords}</p>
                        <p className="mb-2">Longest Word: {textStats.longestWord}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
