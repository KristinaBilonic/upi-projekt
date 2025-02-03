import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./unosKartice.css"; 

export default function UnosKartice() {
  const [brojKartice, setBrojKartice] = useState("");
  const [datum, setDatum] = useState("");
  const [cvv, setCvv] = useState("");
  const [savedCards, setSavedCards] = useState([]);
  const korisnikID = localStorage.getItem("korisnikID"); // Ensure this is set correctly

  const navigate = useNavigate(); // Import and use correctly
  const location = useLocation(); // Import and use correctly

  // **FIXED: Moved handlePayment here**
  const handlePayment = () => {
    console.log("Processing payment...");
    setTimeout(() => {
      navigate('/placeno'); // Correct way to navigate
    }, 3000);
  };

  useEffect(() => {
    if (!korisnikID) {
      console.error("Korisnik ID is undefined!");
      return;
    }

    console.log("Fetching saved cards for:", korisnikID);

    axios.get(`http://localhost:5000/kartice/korisnik/${korisnikID}`)
      .then((response) => {
        setSavedCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved cards:", error);
      });

  }, [korisnikID]);

  return (
    <div className="container">
      <div className="card-form">
        <label>Odaberi spremljenu karticu:</label>
        <select
          onChange={(e) => {
            const selectedCard = savedCards.find(card => card._id === e.target.value);
            if (selectedCard) {
              setBrojKartice(selectedCard.broj);
              setDatum(selectedCard.datum_isteka.split("T")[0]);
              setCvv(selectedCard.cvv);
            }
          }}
        >
          <option value="">-- Odaberi karticu --</option>
          {savedCards.map(card => (
            <option key={card._id} value={card._id}>
              {card.broj.slice(0, 4)} **** **** {card.broj.slice(-4)}
            </option>
          ))}
        </select>

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

        <button className="ok-button" onClick={handlePayment}>OK</button>
      </div>
    </div>
  );
}
