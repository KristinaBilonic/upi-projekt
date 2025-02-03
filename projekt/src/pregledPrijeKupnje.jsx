import React from 'react';
import './pregledPrijeKupnje.css';
import { useNavigate, useLocation } from "react-router-dom";

function PregledPrijeKupnje({ setLoading, passengers }) {
  // const handlePayment = () => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     location.href = '/placeno';
  //     //location.href = '/nijePlaceno';
  //   }, 3000);
  // };
  const navigate = useNavigate();
  const location = useLocation();
  const handleunosKartice = () => {
    navigate('/unosKartice');
  };
  return (
    <div className="container">
      <h1>Pregled</h1>

      <div>
        <p>Datum kupnje: 05.02.2025.</p>
        <p>Polazak: 10:00 - Dolazak: 12:00</p>
        <p>Putnika: {passengers.length} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cijena: 25,00 €</p>
        <p>Naknada za uslugu: 0,99 €</p>
        <p>Zbroj: 25,99 €</p>
        <p>{ JSON.stringify(passengers) }</p>
      </div>

      <button onClick={handleunosKartice}>Plati</button>
    </div>
  );
}

export default PregledPrijeKupnje;