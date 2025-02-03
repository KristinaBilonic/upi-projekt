import React, { useEffect, useState } from 'react';
import './profil.css';

function Profil({ setPageTitle }) {
    const [user, setUser] = useState(null);
    const [greska, setGreska] = useState("");

    useEffect(() => {
        setPageTitle('Profil');
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token koji se šalje:", token);

            if (!token) {
                setGreska("Nema tokena, korisnik nije prijavljen!");
                return;
            }

            const res = await fetch("http://localhost:5000/korisnici/profil", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            

            console.log("Odgovor status:", res.status);
            console.log("Odgovor HEADERS:", res.headers.get("content-type"));
            const responseText = await res.text();
            console.log("Odgovor TEKST:", responseText);

            try {
                const data = JSON.parse(responseText);
                setUser(data);
            } catch (jsonError) {
                throw new Error("Neispravan JSON odgovor sa servera");
            }
        } catch (error) {
            console.error("Greška pri dohvaćanju profila:", error);
            setGreska(error.message);
        }
    };

    const toKarte = () => (location.href = '/povijestKupnji');
    const toKartice = () => (location.href = '/unosKartice');

    return (
        <div className="container">
            {greska && <p style={{ color: "red" }}>{greska}</p>}
            {user ? (
                <>
                    <h2>{user.ime} {user.prezime}</h2>
                    <p>Email: {user.email}</p>
                    <button className="section" onClick={toKartice}>Kartice</button>
                    <button className="section" onClick={toKarte}>Karte</button>
                </>
            ) : (
                <p>Učitavanje korisničkih podataka...</p>
            )}
        </div>
    );
}

export default Profil;
