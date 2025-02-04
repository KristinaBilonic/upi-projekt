import React, { useEffect, useState } from "react";
import "./povratno.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Povratno() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gradOd = searchParams.get("od"); 
  const gradDo = searchParams.get("do"); 
  const datumPovratka = searchParams.get("datum_polaska");
  const putnici = Number(searchParams.get("putnici")) || 1;
  const busIdprvi = searchParams.get("busId"); 
  const [gradOdId, setGradOdId] = useState(null);
  const [gradDoId, setGradDoId] = useState(null);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const GetGradID = async (naziv) => {
      try {
        const response = await fetch(`http://localhost:5000/gradovi/naziv/${naziv}`);
        if (!response.ok) throw new Error("Grad nije pronađen");
        const data = await response.json();
        return data.id;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    };

    const fetchGradIds = async () => {
      if (gradOd && gradDo) {
        const odId = await GetGradID(gradOd);
        const doId = await GetGradID(gradDo);
        setGradOdId(odId);
        setGradDoId(doId);
      }
    };

    fetchGradIds();
  }, [gradOd, gradDo]);


  useEffect(() => {
    const fetchBuses = async () => {
      try {
        if (!gradOdId || !gradDoId || !datumPovratka) {
          console.warn("Nedostaju parametri:", { gradOdId, gradDoId, datumPovratka });
          return;
        }
        const response = await fetch(
          `http://localhost:5000/vozniRedovi/polazak/${gradOdId}/dolazak/${gradDoId}/datum/${datumPovratka}`
        );
        if (!response.ok) {
          throw new Error("Nema dostupnih autobusa za ovu rutu.");
        }
        const data = await response.json();
        setBuses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (gradOdId && gradDoId) {
      fetchBuses();
    }
  }, [gradOdId, gradDoId, datumPovratka]);

  const handlePovratno = (bus) => {
    localStorage.setItem("returnTicketPrice", bus.cijena); // Store return ticket price
    localStorage.setItem("passengers", putnici); // Store passenger count
    localStorage.setItem("busId", bus._id); // Store bus ID

    navigate(`/narudzba?busIdprvi=${busIdprvi}&busIdPovratni=${bus._id}`);
  };

  return (
    <div className="container">

      <main>
        <div className="search-bar">
          <div className="fields">
            <h1>{gradOd} {"\u2192"} {gradDo}</h1>
          </div>
        </div>
        <div className="results">
          <div className="note">Naknada za uslugu naplaćuje se po rezervaciji: 0,99 €</div>
          {buses.length > 0 ? (
            buses.map((bus) => {
              const startTime = new Date(`1970-01-01T${bus.vrijeme_polaska}:00`);
              const endTime = new Date(`1970-01-01T${bus.vrijeme_dolaska}:00`);
              const durationMinutes = (endTime - startTime) / (1000 * 60);
              const durationHours = Math.floor(durationMinutes / 60);
              return (
                <div key={bus._id} className="result">
                  <div className="time">{bus.vrijeme_polaska}</div>
                  <div className="duration">Trajanje: {durationHours} h</div>
                  <div className="arrival">{bus.vrijeme_dolaska}</div>
                  <div className="price">{bus.cijena} €</div>
                  <button type="submit" onClick={() => handlePovratno(bus)}>Dalje</button>
                </div>
              );
            })
          ) : (
            !loading && <p>Nema dostupnih autobusa za ovu rutu.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Povratno;
