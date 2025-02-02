import React from 'react';
import './narudzba.css';

const Narudzba = ({ setPassengers }) => {
    const params = new URL(document.location.toString()).searchParams;
    const passengerCount = params.get("putnici");
    const toPreview = () => {
        const passengers = [];
        const fields = document.querySelectorAll('[type=text]');
        let valid = true;
        for (let i = 0; i < passengerCount * 2; i++) {
            valid &&= fields[i].checkValidity();
            passengers.push(fields[i].value + ' ' + fields[i++].value);
            valid &&= fields[i].checkValidity();
        }
        setPassengers(passengers);
        if (valid) {
            location.href = "/pregledPrijeKupnje";
        }
    };
    return (
        <div className="container">
            <div className="section">
                <h3>Putnici</h3>
                <div className="input-table">{Object.keys('*'.repeat(passengerCount).split('')).map(i => (
                    <div key={i} className="input-group">
                        <input placeholder="Ime putnika" name="passengerFirstName" type="text" required />
                        <input placeholder="Prezime putnika" name="passengerLastName" type="text" required />
                    </div>
                ))}</div>
            </div>
            <div className="section">
                <h3>Rezervacija sjedala</h3>
                <button>Odaberi svoje sjedalo</button>
            </div>
            <div className="section">
                <h3>Dodatna prtljaga</h3>
                <p> {'> '}20 kg (5€)</p>
                <div className="container radio-container">
                    <label>
                        <input type="radio" name="extra-luggage" />
                        <span>✓</span>
                    </label>
                    <label>
                        <input type="radio" name="extra-luggage" defaultChecked />
                        <span>x</span>
                    </label>
                </div>

            </div>
            <div className="section">
                <h3>Plaćanje</h3>
                <div className="container radio-container">
                    <label>
                        <input type="radio" name="payment-method" defaultChecked />
                        Kartica
                    </label>
                    <label>
                        <input type="radio" name="payment-method" />
                        GooglePay
                    </label>
                    <label>
                        <input type="radio" name="payment-method" />
                        PayPal
                    </label>
                </div>
            </div>
            <button className="button" onClick={toPreview}>Dalje</button>
        </div>
    );
};

export default Narudzba;