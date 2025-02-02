import React, { useState } from "react";
import "./popis.css";

const Popis = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, ime: "IME I PREZIME", kartica: "BROJ KARTICE", datum: "DATUM", cvv: "CVV", editable: false },
    { id: 2, ime: "IME I PREZIME", kartica: "BROJ KARTICE", datum: "DATUM", cvv: "CVV", editable: false },
    { id: 3, ime: "IME I PREZIME", kartica: "BROJ KARTICE", datum: "DATUM", cvv: "CVV", editable: false }
  ]);

  /*dodavanje novog*/
  const handleAddBox = () => {
    const newBox = {
      id: boxes.length + 1,
      ime: "",
      kartica: "",
      datum: "",
      cvv: "",
      editable: true
    };
    setBoxes([...boxes, newBox]);
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
  const handleDeleteBox = (id) => {
    setBoxes(boxes.filter((box) => box.id !== id));
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
      {boxes.map((box) => (
        <div key={box.id} className="box">
          <button className="btn delete" onClick={() => handleDeleteBox(box.id)}>Izbriši</button>
          {box.editable ? (
            <>
              <input
                type="text"
                placeholder="IME I PREZIME"
                value={box.ime}
                onChange={(e) => handleInputChange(box.id, "ime", e.target.value)}
              />
              <input
                type="text"
                placeholder="BROJ KARTICE"
                value={box.kartica}
                onChange={(e) =>
                  handleInputChange(box.id, "kartica", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="DATUM"
                value={box.datum}
                onChange={(e) => handleInputChange(box.id, "datum", e.target.value)}
              />
              <input
                type="text"
                placeholder="CVV"
                value={box.cvv}
                onChange={(e) => handleInputChange(box.id, "cvv", e.target.value)}
              />
              <button className="btn save" onClick={() => handleSaveBox(box.id)}>Spremi</button>
            </>
          ) : (
            <>
              <p><strong>{box.ime}</strong></p>
              <p>{box.kartica}</p>
              <p>{box.datum}</p>
              <p>{box.cvv}</p>
            </>
          )}
        </div>
      ))}
      <div className="buttons">
        <button className="btn back">Natrag</button>
        <button className="btn add" onClick={handleAddBox}>
          Dodaj novu
        </button>
      </div>
    </div>
  );
};

export default Popis;
