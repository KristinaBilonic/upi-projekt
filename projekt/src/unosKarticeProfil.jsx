import React, { useState } from "react";
import "./unoskarticeprofil.css";
import { useNavigate } from "react-router-dom";

export default function UnosKarticeProfil() {
  const [brojKartice, setBrojKartice] = useState("");
  const [datum, setDatum] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const handleUnos = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser._id) {
      alert("Morate biti prijavljeni da biste dodali karticu.");
      return;
    }

    const newCard = {
        broj: brojKartice,
        datum_isteka: new Date(`20${datum.split("/")[1]}-${datum.split("/")[0]}-01`),
        cvv: cvv,
        korisnik_ID: storedUser._id,
    };

    try {
        const response = await fetch("http://localhost:5000/kartice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCard),
        });
  
        if (!response.ok) {
          throw new Error("Greška pri dodavanju kartice.");
        }
  
        alert("Kartica uspješno dodana!");
        navigate("/popis"); 
  
      } catch (error) {
        console.error("Greška:", error);
        alert("Neuspješno dodavanje kartice.");
      }
    };

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
        <br></br>
        <button className="ok-button" onClick={handleUnos}>OK</button>
      </div>
    </div>
  );
}
