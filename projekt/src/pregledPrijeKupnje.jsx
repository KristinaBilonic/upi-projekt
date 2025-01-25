import React from 'react';
import './pregledPrijeKupnje.css';

function PregledPrijeKupnje({ setLoading }) {
  const handlePayment = () => {
    setLoading(true)
    setTimeout(() => {
      location.href = '/placeno';
      //location.href = '/nijePlaceno';
    }, 3000);
  };
  return (
    <div className="container">
      <h1>Pregled</h1>

      <div>
        <p>Datum kupnje: 05.02.2025.</p>
        <p>Polazak: 10:00 - Dolazak: 12:00</p>
        <p>Putnika: 2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cijena: 25,00 €</p>
        <p>Naknada za uslugu: 0,99 €</p>
        <p>Zbroj: 25,99 €</p>
      </div>

      <button onClick={handlePayment}>Plati</button>
    </div>
  );
}

export default PregledPrijeKupnje;