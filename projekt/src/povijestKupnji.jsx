import React, { useEffect , useState } from 'react';
import './povijestKupnji.css';

function PovijestKupnji({ passengers, setPageTitle }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPageTitle('Pregled kupljenih karti');
    fetchUserKarte();
  }, []);

  const fetchUserKarte = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser._id) {
      setError("Nema prijavljenog korisnika.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/karte/korisnik/${storedUser._id}`);
      if (!response.ok) {
        throw new Error("Greška pri dohvaćanju povijesti kupnji.");
      }

      const data = await response.json();
      setTickets(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <p>Učitavanje...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && tickets.length === 0 && <p>Nema kupljenih karti.</p>}

      {tickets.map(ticket => (
        <div key={ticket._id} className="ticket-card">
          <h3>Karta broj: {ticket._id}</h3>

          <img src="/qr.png" alt="QR kod" />

          <div>
            <p><strong>Polazak:</strong> {ticket.vozni_red_ID?.mjesto_polaska.naziv || "Nepoznato"} - 
               <strong>Dolazak:</strong> {ticket.vozni_red_ID?.mjesto_dolaska.naziv || "Nepoznato"}</p>
            <p><strong>Putnik/ci:</strong> {ticket.korisnik_ID?.ime || "Nepoznato" } &nbsp;&nbsp;&nbsp; 
               <strong>Cijena:</strong> {ticket.price ? ticket.price.toFixed(2) : "N/A"} €</p>
          </div>
        </div>
      ))}
    </div>
  );
}


export default PovijestKupnji;
