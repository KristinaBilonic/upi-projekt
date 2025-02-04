import React, { useState, useEffect } from 'react';
import './narudzba.css';
import { useNavigate } from "react-router-dom";

const Narudzba = ({ setPassengers }) => {
    const navigate = useNavigate();

    // Get the number of passengers from localStorage
    const passengerCount = Number(localStorage.getItem('passengers')) || 1;

    // Load passenger names from localStorage or initialize an empty array with the correct number of passengers
    const [passengers, setLocalPassengers] = useState(() => {
        const storedPassengers = JSON.parse(localStorage.getItem("passengerNames"));
        return storedPassengers?.length === passengerCount
            ? storedPassengers
            : Array.from({ length: passengerCount }, () => ({ firstName: "", lastName: "" }));
    });

    // Load selected seats from localStorage
    const [selectedSeats, setSelectedSeats] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedSeats"))?.filter(seat => seat) || [];
    });

    // Save passenger names and seats to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("passengerNames", JSON.stringify(passengers));
        localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    }, [passengers, selectedSeats]);

    // Update passengers when passenger count changes
    useEffect(() => {
        setLocalPassengers((prevPassengers) => {
            const updatedPassengers = Array.from({ length: passengerCount }, (_, i) => ({
                firstName: prevPassengers[i]?.firstName || "",
                lastName: prevPassengers[i]?.lastName || ""
            }));
            return updatedPassengers;
        });
    }, [passengerCount]);

    // Handle input changes for each passenger
    const handleInputChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setLocalPassengers(updatedPassengers);
    };

    // Handle baggage selection
    const handleBaggageSelection = (hasExtraBaggage) => {
        localStorage.setItem("extraBaggage", hasExtraBaggage);
    };

    const handleSeatSelection = () => {
        localStorage.removeItem("selectedSeats"); // Clear previous selection
        navigate('/sjedala');
    };

    // Listen for seat changes after user selects new ones
    useEffect(() => {
        const savedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
        setSelectedSeats(savedSeats); // Update state with new seat choices
    }, []);

    // Navigate to preview page after validation
    const toPreview = () => {
        if (passengers.every(p => p.firstName.trim() && p.lastName.trim())) {
            setPassengers(passengers);
            localStorage.setItem("passengerNames", JSON.stringify(passengers));
            navigate('/pregledPrijeKupnje');
        } else {
            alert("Molimo unesite sva imena i prezimena.");
        }
    };

    return (
        <div className="container">
            <div className="section">
                <h3>Putnici</h3>
                <div className="input-table">
                    {passengers.map((p, index) => (
                        <div key={index} className="input-group">
                            <input
                                type="text"
                                placeholder={`Ime putnika ${index + 1}`}
                                value={p.firstName}
                                onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder={`Prezime putnika ${index + 1}`}
                                value={p.lastName}
                                onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
                                required
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ✅ FIX: SEAT SELECTION BUTTON NOW WORKS PROPERLY ✅ */}
            <div className="section">
                <h3>Rezervacija sjedala</h3>
                <button onClick={handleSeatSelection}>
                    {selectedSeats.length > 0 ? "Promijeni sjedala" : "Odaberi svoja sjedala"}
                </button>
                {selectedSeats.length > 0 && (
                    <div>
                        <h4>Odabrana sjedala:</h4>
                        <ul>
                            {selectedSeats.map(seat => (
                                <li key={seat}>{seat}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="section">
                <h3>Dodatna prtljaga</h3>
                <p>{"> "}20 kg (5€)</p>
                <div className="container radio-container">
                    <label>
                        <input type="radio" name="extra-luggage" onChange={() => handleBaggageSelection(true)} />
                        <span>✓</span>
                    </label>
                    <label>
                        <input type="radio" name="extra-luggage" onChange={() => handleBaggageSelection(false)} defaultChecked />
                        <span>x</span>
                    </label>
                </div>
            </div>

            <div className="section">
                <h3>Plaćanje</h3>
                <div className="container radio-container">
                    <label>
                        <input type="radio" name="payment-method" defaultChecked />
                        Kartica
                    </label>
                    <label>
                        <input type="radio" name="payment-method" />
                        GooglePay
                    </label>
                    <label>
                        <input type="radio" name="payment-method" />
                        PayPal
                    </label>
                </div>
            </div>

            <button className="button" onClick={toPreview}>Dalje</button>
        </div>
    );
};

export default Narudzba;
