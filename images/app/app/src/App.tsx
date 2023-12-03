import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import React from "react";

function App() {
  const [input, setInput] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input == "") {
      return alert("Please fill in a username");
    }
    localStorage.setItem("username", input);
    setInput("");
    window.location.href = "/users";
  };
  return (
    <>
      <div className="home">
        <div className="home-title">
          <p>Enter your username to get access</p>
          <form className="home-title-inputs" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a username"
            />
            <button>OK</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
