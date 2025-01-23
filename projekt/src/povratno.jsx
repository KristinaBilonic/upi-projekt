import React from "react";
import "./povratno.css";
import { useNavigate } from "react-router-dom";

function Povratno() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">AUTOBUSNI VOZNI RED</h1>
      </header>
      <main>
        <div className="search-bar">
          <div className="search-options">
            <label>
              <input type="radio" name="trip" defaultChecked /> Jedan smjer
            </label>
            <label>
              <input type="radio" name="trip" /> Povratno putovanje
            </label>
          </div>
          <div className="fields">
            <input type="text" placeholder="Od" defaultValue="Split" />
            <input type="text" placeholder="Do" defaultValue="Zagreb" />
            <input type="date" defaultValue="2025-01-22" />
            <select>
              <option>1 odrasla osoba</option>
              <option>2 odrasle osobe</option>
              <option>3 odrasle osobe</option>
            </select>
          </div>
        </div>
        <div className="results">
          <div className="note">Naknada za uslugu naplaćuje se po rezervaciji: 0,99 €</div>
          <div className="result">
            <div className="time">01:20</div>
            <div className="duration">05:40 h</div>
            <div className="arrival">07:00</div>
            <div className="price">19,99 €</div>
            <button className="details-button">Dalje</button>
          </div>
          <div className="result">
            <div className="time">05:00</div>
            <div className="duration">5:05 h</div>
            <div className="arrival">10:05</div>
            <div className="price">20,49 €</div>
            <button className="details-button">Dalje</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Povratno;
