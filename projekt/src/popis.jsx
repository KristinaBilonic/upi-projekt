import React, { useEffect,useState } from "react";
import "./popis.css";
import { useNavigate } from "react-router-dom";

const Popis = () => {
  const [kartice, setKartice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchKartice = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser._id) {
          setError("Nema prijavljenog korisnika.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/kartice/korisnik/profil/${storedUser._id}`);
        if (!response.ok) {
          throw new Error("Greška pri dohvaćanju kartica.");
        }

        const data = await response.json();
        setKartice(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKartice();
  }, []);

  /*dodavanje novog*/
  const handleAddCard = async (cardData) => {
    navigate('/unosKarticeProfil')
  };

  /*sprema*/
  const handleSaveBox = (id) => {
    setBoxes(
      boxes.map((box) =>
        box.id === id ? { ...box, editable: false } : box
      )
    );
  };

  /*brisanje*/
  const handleBrisi = async (id) => {
    if (!window.confirm("Jeste li sigurni da želite izbrisati ovu karticu?")) return;

    try {
      const response = await fetch(`http://localhost:5000/kartice/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Greška pri brisanju kartice.");
      }


      setKartice(kartice.filter((card) => card._id !== id));
      alert("Kartica je uspješno izbrisana!");
    } catch (error) {
      console.error("Greška:", error);
      alert("Neuspješno brisanje kartice.");
    }
  };

  /*prati unos*/
  const handleInputChange = (id, field, value) => {
    setBoxes(
      boxes.map((box) =>
        box.id === id ? { ...box, [field]: value } : box
      )
    );
  };

  return (
    <div className="container">
      <h2>Moje kartice</h2>
      {loading && <p>Učitavanje...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && kartice.length === 0 && <p>Nema spremljenih kartica.</p>}

      {kartice.map((box) => (
        <div key={box._id} className="box">
          <button className="btn delete" onClick={() => handleBrisi(box._id)}>Izbriši</button>

          {box.editable ? (
            <>
              <input
                type="text"
                placeholder="Ime"
                value={box.korisnik_ID.ime}
                onChange={(e) => handleInputChange(box._id, "korisnik_ID", { ime: e.target.value })}
              />
              <input
                type="text"
                placeholder="Prezime"
                value={box.korisnik_ID.prezime}
                onChange={(e) => handleInputChange(box._id, "korisnik_ID", { prezime: e.target.value })}
              />
              <input
                type="text"
                placeholder="Broj Kartice"
                value={box.broj}
                onChange={(e) => handleInputChange(box._id, "broj", e.target.value)}
              />
              <input
                type="month"
                placeholder="Datum Isteka"
                value={box.datum_isteka}
                onChange={(e) => handleInputChange(box._id, "datum_isteka", e.target.value)}
              />
              <button className="btn save" onClick={() => handleSaveBox(box._id)}>Spremi</button>
            </>
          ) : (
            <>
              <p><strong>Ime i Prezime:</strong> {box.korisnik_ID.ime} {box.korisnik_ID.prezime}</p>
              <p><strong>Broj Kartice:</strong> **** **** **** {box.broj.slice(-4)}</p>
              <p><strong>Datum Isteka:</strong> {box.datum_isteka.slice(0, 7)}</p>
              <p><strong>CVV:</strong> ***</p>
            </>
          )}
        </div>
      ))}
      <div className="buttons">
        <button className="btn back">Natrag</button>
        <button className="btn add" onClick={handleAddCard}>
          Dodaj novu
        </button>
      </div>
    </div>
  );
};

export default Popis;
