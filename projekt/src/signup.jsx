import React from 'react';
import './signup.css';

const SignUp = () => {
  return (
    <div className="form-container">
      <h1 className="title">KREIRAJ KORISNIČKI RAČUN</h1>
      <form className="form">
        <div className="form-group">
          <label htmlFor="first-name">IME</label>
          <input type="text" id="first-name" placeholder="Unesite ime" />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">PREZIME</label>
          <input type="text" id="last-name" placeholder="Unesite prezime" />
        </div>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" placeholder="Unesite email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">LOZINKA</label>
          <input type="password" id="password" placeholder="Unesite lozinku" />
        </div>
        <button className="submit-button" type="submit">
          KREIRAJ
        </button>
      </form>
    </div>
  );
};

export default SignUp;
