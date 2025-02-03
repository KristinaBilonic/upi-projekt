import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';


const Home = ({ setPageTitle }) => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toLocation, setToLocation] = useState('');
  const [toDate, setToDate] = useState(null);
  const [passengers, setPassengers] = useState(() => {
    return Number(localStorage.getItem('passengers')) || 1;
  });
  const [isReturnTrip, setIsReturnTrip] = useState(false);

  const handleSearch = () => {
    console.log('From:', fromLocation, 'Date:', fromDate);
    console.log('To:', toLocation, 'Date:', toDate);
    console.log('Passengers:', passengers);
    console.log('Return Trip:', isReturnTrip);
    localStorage.setItem("passengers", passengers);
    const formatiraniDatOd = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}-${String(fromDate.getDate()).padStart(2, '0')}`;

    if(!isReturnTrip){
      navigate(`/jedansmjer?od=${fromLocation}&do=${toLocation}&datum_polaska=${formatiraniDatOd}&putnici=${passengers}`);
    }else{
      const formatiraniDatDO = `${toDate.getFullYear()}-${String(toDate.getMonth() + 1).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`;
      navigate(`/jedansmjer?od=${fromLocation}&do=${toLocation}&datum_polaska=${formatiraniDatOd}&datum_povratka=${formatiraniDatDO}&putnici=${passengers}&povratno=${isReturnTrip}`);
    }

  };


  useEffect(() => setPageTitle(''), []);

  return (
    <div className="container">
      <h1>Kupnja autobusnih karata</h1>
      <div>
        <label htmlFor="fromLocation">Od:</label>
        <input
          type="text"
          id="fromLocation"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
        />
        <DatePicker
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isReturnTrip}
            onChange={(e) => setIsReturnTrip(e.target.checked)}
          />
          Povratno putovanje
        </label>
      </div>
      <div>
        <label htmlFor="toLocation">Do:</label>
        <input
          type="text"
          id="toLocation"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
        />
        <DatePicker
          selected={toDate}
          onChange={(date) => setToDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
          disabled={!isReturnTrip}
        />
      </div>
      <div>
        <label htmlFor="passengers">Broj putnika:</label>
        <input
          type="number"
          id="passengers"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          min={1}
        />
      </div>
      <button onClick={handleSearch}>Traži</button>
    </div>
  );
};

export default Home;