import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    sifra: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/korisnici/registracija", formData);
      alert("Registracija uspješna! Prijavite se.");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.error || "Greška pri registraciji!");
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">KREIRAJ KORISNIČKI RAČUN</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ime">IME</label>
          <input type="text" id="ime" placeholder="Unesite ime" value={formData.ime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="prezime">PREZIME</label>
          <input type="text" id="prezime" placeholder="Unesite prezime" value={formData.prezime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" placeholder="Unesite email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="sifra">LOZINKA</label>
          <input type="password" id="sifra" placeholder="Unesite lozinku" value={formData.sifra} onChange={handleChange} required />
        </div>
        <button className="submit-button" type="submit">KREIRAJ</button>
      </form>
    </div>
  );
};

export default SignUp;
