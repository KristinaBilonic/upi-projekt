import React from 'react';
import './pregledPrijeKupnje.css';
import { useNavigate } from "react-router-dom";

function PregledPrijeKupnje() {
  const navigate = useNavigate();

  // Retrieve stored booking details
  const passengers = JSON.parse(localStorage.getItem('passengerNames')) || [];
  const fromCity = localStorage.getItem('fromCity') || "Nepoznato";
  const toCity = localStorage.getItem('toCity') || "Nepoznato";
  const departureDate = localStorage.getItem('departureDate') || "Nepoznato";
  const returnDate = localStorage.getItem('returnDate');
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
  const ticketPrice = parseFloat(localStorage.getItem('ticketPrice')) || 0;
  const returnTicketPrice = parseFloat(localStorage.getItem('returnTicketPrice')) || 0;
  const serviceFee = 0.99;

  // Check if extra baggage was selected
  const extraBaggage = localStorage.getItem("extraBaggage") === "true" ? 5.00 : 0.00;

  // Seat reservation fee (half ticket price per passenger)
  const seatReservationFee = selectedSeats.length > 0 ? ((ticketPrice + returnTicketPrice) / 2) * passengers.length : 0.00;

  // Calculate total price
  const totalPrice = ((ticketPrice + returnTicketPrice) * passengers.length) + serviceFee + extraBaggage + seatReservationFee;

  const handleUnosKartice = () => {
    navigate('/unosKartice');
  };

  return (
    <div className="container">
      <h1>Pregled Rezervacije</h1>

      <div>
        <p><strong>Polazak:</strong> {fromCity} → {toCity}</p>
        <p><strong>Datum polaska:</strong> {departureDate}</p>
        {returnDate && <p><strong>Datum povratka:</strong> {returnDate}</p>}
        <p><strong>Putnici:</strong> {passengers.length}</p>
        <p><strong>Odabrana sjedala:</strong> {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Nisu odabrana"}</p>
        <p><strong>Cijena karte u jednom smjeru:</strong> {ticketPrice.toFixed(2)} €</p>
        {returnTicketPrice > 0 && <p><strong>Cijena povratne karte:</strong> {returnTicketPrice.toFixed(2)} €</p>}
        <p><strong>Naknada za uslugu:</strong> {serviceFee.toFixed(2)} €</p>
        <p><strong>Dodatna prtljaga:</strong> {extraBaggage > 0 ? "Da (+5.00€)" : "Ne"}</p>
        <p><strong>Rezervacija sjedala:</strong> {seatReservationFee > 0 ? `${seatReservationFee.toFixed(2)} €` : "Nema rezervacije"}</p>
        <p><strong>Ukupno za platiti:</strong> <span style={{ fontWeight: 'bold', color: 'green' }}>{totalPrice.toFixed(2)} €</span></p>

        <p><strong>Putnici:</strong> {passengers.map((p, index) => (
          <span key={index}>{p.firstName} {p.lastName}{index !== passengers.length - 1 ? ", " : ""}</span>
        ))}</p>
      </div>

      <button onClick={handleUnosKartice}>Plati</button>
    </div>
  );
}

export default PregledPrijeKupnje;
