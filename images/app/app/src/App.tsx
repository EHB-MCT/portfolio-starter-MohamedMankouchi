import { useState } from "react";

import "./App.css";

function App() {
  return (
    <>
      <div className="home">
        <div className="home-title">
          <p>Enter your username to get access</p>
          <form className="home-title-inputs">
            <input type="text" placeholder="Enter a username" />
            <button>OK</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
