import React, { useEffect } from 'react';
import './povijestKupnji.css';

function PovijestKupnji({ passengers, setPageTitle }) {
  useEffect(() => setPageTitle('Pregled kupljenih karti'), []);
  return (
    <div className="container">
      {
        passengers.map(passenger => (
          <div key={passenger}>
            <h1>Karta</h1>

            <img src="/qr.png" alt="QR kod" />

            <div>
              <p>Datum kupnje: 05.02.2025.</p>
              <p>Polazak: 10:00 - Dolazak: 12:00</p>
              <p>Putnika: 2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cijena: 25,00 €</p>
              <p>Naknada za uslugu: 0,99 €</p>
              <p>Zbroj: 25,99 €</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default PovijestKupnji;