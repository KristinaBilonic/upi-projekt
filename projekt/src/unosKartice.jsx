import React, { useState } from "react";
import "./unosKartice.css"; 

export default function UnosKartice() {
  const [brojKartice, setBrojKartice] = useState("");
  const [datum, setDatum] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="container">
      <div className="card-form">
        <label>BROJ KARTICE:</label>
        <input
          placeholder="1234 5678 9123 4567"
          type="text"
          value={brojKartice}
          onChange={(e) => setBrojKartice(e.target.value)}
          className="input-box full-width"
        />

        <div className="row">
          <div className="column">
            <label>DATUM:</label>
            <input
              placeholder="MM/GG"
              type="text"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              className="input-box"
            />
          </div>
          <div className="column">
            <label>CVV:</label>
            <input
              placeholder="3 znamenke"
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="input-box"
            />
          </div>
        </div>

        <br />
        <button className="ok-button">OK</button>
      </div>
    </div>
  );
}
