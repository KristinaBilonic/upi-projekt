import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ setPageTitle }) => {
  const navigate = useNavigate();

  const [fromLocation, setFromLocation] = useState(localStorage.getItem("fromCity") || '');
  const [fromDate, setFromDate] = useState(localStorage.getItem("departureDate") ? new Date(localStorage.getItem("departureDate")) : null);
  const [toLocation, setToLocation] = useState(localStorage.getItem("toCity") || '');
  const [toDate, setToDate] = useState(localStorage.getItem("returnDate") ? new Date(localStorage.getItem("returnDate")) : null);
  const [passengers, setPassengers] = useState(Number(localStorage.getItem('passengers')) || 1);
  const [isReturnTrip, setIsReturnTrip] = useState(localStorage.getItem("isReturnTrip") === "true");


  const handleSearch = () => {
    // Save selected cities, dates, and passengers to localStorage
    localStorage.setItem("fromCity", fromLocation);
    localStorage.setItem("toCity", toLocation);
    localStorage.setItem("departureDate", fromDate ? fromDate.toISOString().split("T")[0] : "");
    localStorage.setItem("returnDate", isReturnTrip && toDate ? toDate.toISOString().split("T")[0] : "");
    localStorage.setItem("passengers", passengers);
    localStorage.setItem("isReturnTrip", isReturnTrip);

    // Format date for navigation
    const formattedFromDate = fromDate ? fromDate.toISOString().split("T")[0] : "";
    if (!isReturnTrip) {
      navigate(`/jedansmjer?od=${fromLocation}&do=${toLocation}&datum_polaska=${formattedFromDate}&putnici=${passengers}`);
    } else {
      const formattedToDate = toDate ? toDate.toISOString().split("T")[0] : "";
      navigate(`/jedansmjer?od=${fromLocation}&do=${toLocation}&datum_polaska=${formattedFromDate}&datum_povratka=${formattedToDate}&putnici=${passengers}&povratno=${isReturnTrip}`);
    }
  };

  useEffect(() => setPageTitle(''), []);

  return (
    <div className="container">
      <h1>KUPNJA AUTOBUSNIH KARATA</h1>
      <div>

        <label>Od:</label>
        <input type="text" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} />
        <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} dateFormat="dd/MM/yyyy" placeholderText="Select date" />
      </div>
      <div style={{ color: "red" }}>
        { validationError }
      </div>
      <div>
        <label>
          <input type="checkbox" checked={isReturnTrip} onChange={(e) => setIsReturnTrip(e.target.checked)} />
          Povratno putovanje
        </label>
      </div>
      <div>
        <label>Do:</label>
        <input type="text" value={toLocation} onChange={(e) => setToLocation(e.target.value)} />
        <DatePicker selected={toDate} onChange={(date) => setToDate(date)} dateFormat="dd/MM/yyyy" placeholderText="Select date" disabled={!isReturnTrip} />
      </div>
      <div>
        <label>Broj putnika:</label>
        <input type="number" value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} min={1} />
      </div>
      <button onClick={handleSearch}>Traži</button>
    </div>
  );
};

export default Home;
