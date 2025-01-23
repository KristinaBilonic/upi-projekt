import React from "react";
import "./jedansmjer.css";
import { useNavigate } from "react-router-dom";


function JedanSmjer() {
    const navigate =useNavigate();

    const handleJedanSmjer = () => {
        navigate('/povratno');
    }
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
            <input type="text" placeholder="Od" defaultValue="Zagreb" />
            <input type="text" placeholder="Do" defaultValue="Split" />
            <input type="date" defaultValue="2025-01-20" />
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
            <div className="time">23:55</div>
            <div className="duration">5:05 h</div>
            <div className="arrival">05:00</div>
            <div className="price">19,99 €</div>
            <button type="submit" onClick={handleJedanSmjer}>Dalje</button>
          </div>
          <div className="result">
            <div className="time">02:00</div>
            <div className="duration">6:05 h</div>
            <div className="arrival">08:05</div>
            <div className="price">20,49 €</div>
            <button type="submit" onClick={handleJedanSmjer}>Dalje</button>
          </div>
        </div>
      </main>
    </div>



  );
  
}

export default JedanSmjer;

