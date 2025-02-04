import React, { useEffect, useState } from 'react';
import './karta.css';
import { useNavigate } from 'react-router-dom';

const Karta = () => {
  const navigate = useNavigate();
  const korisnikID = localStorage.getItem('korisnikID'); // Get logged-in user ID

  // Retrieve stored booking details
  const busId = localStorage.getItem('busId');
  const passengers = JSON.parse(localStorage.getItem('passengerNames')) || [];
  const fromCity = localStorage.getItem('fromCity') || "Nepoznato";
  const toCity = localStorage.getItem('toCity') || "Nepoznato";
  const departureDate = localStorage.getItem('departureDate') || "Nepoznato";
  const returnDate = localStorage.getItem('returnDate');
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
  const ticketPrice = parseFloat(localStorage.getItem('ticketPrice')) || 0;
  const returnTicketPrice = parseFloat(localStorage.getItem('returnTicketPrice')) || 0;
  const serviceFee = 0.99;
  const extraBaggage = localStorage.getItem("extraBaggage") === "true" ? 5.00 : 0.00;
  const seatReservationFee = selectedSeats.length > 0 ? ((ticketPrice + returnTicketPrice) / 2) * passengers.length : 0.00;
  const totalPrice = ((ticketPrice + returnTicketPrice) * passengers.length) + serviceFee + extraBaggage + seatReservationFee;

  const [isSaved, setIsSaved] = useState(false);

  // Function to save ticket to the database
  const saveTicketToDB = async () => {
    try {
      // Check if the ticket has already been saved
      if (localStorage.getItem("ticketSaved") === "true") {
        console.log("🚫 Ticket already saved, skipping duplicate request.");
        return;
      }

      console.log("Saving ticket...");
      console.log("Extra Baggage:", extraBaggage > 0);
      console.log("Selected Seats:", selectedSeats);
      console.log("Bus ID:", localStorage.getItem('busId'));
      console.log("User ID:", korisnikID);
      console.log("Total Price:", totalPrice.toFixed(2));

      const selectedSeatsString = selectedSeats.join(", "); // Convert array to string

      const response = await fetch('http://localhost:5000/karte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dodatna_prtljaga: extraBaggage > 0, // true if extra baggage selected
          sjedalo_ID: selectedSeatsString, // Store selected seats as a string
          vozni_red_ID: busId, // Get bus ID from localStorage
          korisnik_ID: korisnikID, // Associate ticket with logged-in user
          price: totalPrice.toFixed(2),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save ticket');
      }

      console.log("✅ Ticket saved successfully!");
      localStorage.setItem("ticketSaved", "true"); // ✅ Prevent duplicate saves
      setIsSaved(true); // ✅ Update state to prevent re-saving
    } catch (error) {
      console.error('❌ Error saving ticket:', error);
    }
  };

  // Save the ticket to the database when the component loads
  useEffect(() => {
    if (!isSaved) {
      saveTicketToDB();
    }
  }, [isSaved]); 

  // Function to return to home and reset ticket save status
  const toHome = () => {
    localStorage.removeItem("ticketSaved"); 
    navigate('/home');
  };

  return (
    <div className="container">
      <h1>Vaša Karta</h1>

      <img src="/qr.png" alt="QR kod" />

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

        <button onClick={toHome}>Kraj</button>
      </div>
    </div>
  );
};

export default Karta;
