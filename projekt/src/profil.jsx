import React, { useEffect } from 'react';
import './profil.css';

function Profil({ fullName, setPageTitle }) {
    const toKarte = () => location.href = '/povijestKupnji';
    useEffect(() => setPageTitle('Profil'), []);
    return (
        <div className="container">
            <button className="section">{fullName}</button>
            <button className="section">Kartice</button>
            <button className="section" onClick={toKarte}>Karte</button>
        </div>
    );
}

export default Profil;