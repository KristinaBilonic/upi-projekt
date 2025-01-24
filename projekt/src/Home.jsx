import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home = ({ setPageTitle }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toLocation, setToLocation] = useState('');
  const [toDate, setToDate] = useState(null);
  const [passengers, setPassengers] = useState(1);

  const handleSearch = () => {
    console.log('From:', fromLocation, 'Date:', fromDate);
    console.log('To:', toLocation, 'Date:', toDate);
    console.log('Passengers:', passengers);
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
        />
      </div>
      <div>
        <label htmlFor="passengers">Broj putnika:</label>
        <input
          type="number"
          id="passengers"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          min={1}
        />
      </div>
      <button onClick={handleSearch}>Traži</button>
    </div>
  );
};

export default Home;