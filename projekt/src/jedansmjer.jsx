import React, { useEffect, useState }  from "react";
import "./jedansmjer.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function JedanSmjer() {
  const navigate =useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const gradOd = searchParams.get("od"); 
  const gradDo = searchParams.get("do"); 
  const datumDo = searchParams.get("datum_polaska"); 
  const datumOd = searchParams.get("datum_povratka"); 
  const putnici = Number(searchParams.get("putnici")) || 1;
  const povratno = searchParams.get("povratno"); 
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
        console.error("Error: ", error);
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
        if (!gradOdId || !gradDoId || !datumDo) {
          console.warn("Nedostaje unos:", { gradOdId, gradDoId, datumDo });
          return;
        }
        const response = await fetch(
          `http://localhost:5000/vozniRedovi/polazak/${gradOdId}/dolazak/${gradDoId}/datum/${datumDo}`
        );
        if (!response.ok) {
          throw new Error("Nema dostupnih autobusa za ovu rutu.");
        }
        const data = await response.json();
        console.log(data);
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
  }, [gradOdId, gradDoId, datumDo]);

  const handleJedanSmjer = (bus) => {
    if(!povratno){
      navigate(`/narudzba?od=${gradOd}&do=${gradDo}&datum_polaska=${datumOd}&datum_povratka=${datumDo}&putnici=${putnici}&busId=${bus._id}`);
    }else{
      navigate(`/povratno?od=${gradDo}&do=${gradOd}&datum_polaska=${datumOd}&putnici=${putnici}&busId=${bus._id}`);
    }
  };
  return (
    <div className="container">
     
      <main>
        <div className="search-bar">
          <div className="fields">
            <h1>{gradOd} {"\u2192"}  {gradDo}</h1>

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
              return(
                <div key={bus._id} className="result">
                <div className="time">{bus.vrijeme_polaska}</div>
                <div className="duration">Trajanje: {durationHours} h</div>
                <div className="arrival">{bus.vrijeme_dolaska}</div>
                <div className="price">{bus.cijena} €</div>
                <button type="submit" onClick={() => handleJedanSmjer(bus)}>Dalje</button>
                </div>
              )

            })
          ) : (
            !loading && <p>nema dostupnih autobusa za ovu rutu.</p>
          )}
        </div>
      </main>
    </div>



  );
  
}

export default JedanSmjer;

