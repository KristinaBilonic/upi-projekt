import React, { useEffect, useState } from 'react';
import './profil.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
function Profil({setPageTitle }) {
    const navigate = useNavigate();
//  const toKarte = () => location.href = '/povijestKupnji';
    const [user, setUser] = useState(null);
    const [ucitava, setucitava] = useState(true);
    
    useEffect(() => {
        setPageTitle('Profil');
        const storedUser = localStorage.getItem("user");
        
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.ime && parsedUser.prezime) {
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error("error", error);
            }
        }
        setucitava(false);
    }, []);

    const handleKarte = () => navigate('/povijestKupnji');
    const handleKartice = () => navigate('/popis');

    if (ucitava) {
        return <p>ucitava...</p>;
    }

    return (
        <div className="container">
            <button className="section">{user.ime} {user.prezime}</button>
            <button className="section" onClick={handleKartice}>Kartice</button>
            <button className="section" onClick={handleKarte}>Karte</button>
        </div>
    );
}

export default Profil;