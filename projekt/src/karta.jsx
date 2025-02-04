import React from 'react';
import './karta.css';

function Karta() {
  const params = new URL(document.location.toString()).searchParams;
  const passengerCount = params.get("putnici");
  const toHome = () => location.href = "/home";
  return (
    <div className="container">
      <h1>Karta</h1>

      <img src="/qr.png" alt="QR kod" height="120px" />

      <div>
        <p>Datum kupnje: 05.02.2025.</p>
        <p>Polazak: 10:00 - Dolazak: 12:00</p>
        <p>Putnika: {passengerCount} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cijena: 25,00 €</p>
        <p>Naknada za uslugu: 0,99 €</p>
        <p>Zbroj: 25,99 €</p>
      </div>

      <button onClick={toHome}>Kraj</button>
    </div>
  );
}

export default Karta;