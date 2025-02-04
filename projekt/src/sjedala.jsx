import React, { useState } from "react";
import "./sjedala.css";
import { useNavigate } from "react-router-dom";

const rows = 6;
const cols = 4; // Total columns per row (2 on each side)

export default function Sjedala() {
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (row, col) => {
        const seatId = `${row}-${col}`;
        setSelectedSeats((prev) =>
            prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
        );
    };

    const formatSeatId = (seatId) => {
        const [row, col] = seatId.split('-');
        const rowLetter = String.fromCharCode(65 + parseInt(row, 10)); // Convert row number to letter
        const seatNumber = parseInt(col, 10) + 1; // Convert column number to 1-based index
        return `${rowLetter}${seatNumber}`;
    };

    const handleOk = () => {
        const formattedSeats = selectedSeats.map(formatSeatId);
        navigate('/narudzba', { state: { selectedSeats: formattedSeats } });
    };

    return (
        <div className="container">
            <div className="bus-layout">
                <div className="seats-grid">
                    {Array.from({ length: rows }).map((_, row) => (
                        <div key={row} className="seat-row">
                            {Array.from({ length: cols }).map((_, col) => (
                                <div
                                    key={`${row}-${col}`}
                                    className={`seat ${selectedSeats.includes(`${row}-${col}`) ? "selected" : ""}`}
                                    onClick={() => toggleSeat(row, col)}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
                <button className="ok-button" onClick={handleOk}>OK</button>
            </div>
        </div>
    );
}