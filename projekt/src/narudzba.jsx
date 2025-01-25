import React from 'react';
import './narudzba.css';

const Narudzba = ({ passengers }) => {
    const toPreview = () => location.href = "/pregledPrijeKupnje";
    return (
        <div className="container">
            <div className="section">
                <h3>Putnici</h3>
                <p>{ passengers.join(', ') }</p>
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