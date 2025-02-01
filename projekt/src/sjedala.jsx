import React, { useState } from "react";
import "./sjedala.css";
import { useNavigate } from "react-router-dom"; 




const rows = 6;

export default function Sjedala() {

    const navigate = useNavigate();

    
    
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (row, col) => {
      const seatId = `${row}-${col}`;
      setSelectedSeats((prev) =>
        prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };
  
  return (
    <div className="container">
      <div className="bus-layout">
        <div className="seats-grid">
          {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="seat-row">
              
              {Array.from({ length: 2 }).map((_, col) => (
                <div
                  key={`${row}-left-${col}`}
                  className={`seat ${selectedSeats.includes(`${row}-left-${col}`) ? "selected" : ""}`}
                  onClick={() => toggleSeat(row, `left-${col}`)}
                ></div>
              ))}
              
              
              <div className="seat-space"></div>

              
              {Array.from({ length: 2 }).map((_, col) => (
                <div
                  key={`${row}-right-${col}`}
                  className={`seat ${selectedSeats.includes(`${row}-right-${col}`) ? "selected" : ""}`}
                  onClick={() => toggleSeat(row, `right-${col}`)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <button className="ok-button">OK</button>
        
      </div>
    </div>
  );
}


