import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setLoading }) {
    //kod koji je bitan za komponentu kad je pokrenuta aplikacija dolazi unutar funkcije
    const navigate = useNavigate();

    const [provjera, setProvjera] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginAction = async (event) => {
        event.preventDefault(); // Sprječavanje standard. ponašanja forme
        setError(''); // Brisanje prethodne poruke o grešci

        try {
            const response = await fetch('http://localhost:5000/korisnici/prijava', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    sifra: password // Ovo je lozinka koja je unesena u formu i poslana na server(backend da vidi jel valja)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Spremanje tokena i korisničkih podataka u lokalno pohranu
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('korisnikID', data.user._id);

            // Prikaz poruke o uspješnoj prijavi
            alert('Successfully logged in!');
            navigate('/home');
            // Opcionalno: preusmjeravanje na drugu stranicu ili nazad na početnu al ovo ne radi jer nemamo dashboard
            // window.location.href = '/dashboard';
            
        } catch (err) {
            setError(err.message || 'An error occurred during login');
            setError(err);
            alert(err)
        }    
    };
    const handlesignup = async (event) => {
        navigate('/signup');
    };
    //onClick={handleLogin} za botun (na kraju netriba al neka stoji za ostale stvari ako zatriba)
    //JSX - Javascript XML notation
    return (
        <div className="login-container">
            <h1>Login</h1>
            <form id="login-form" onSubmit={loginAction}>
                <label>
                    Email:
                    <input type="email"
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required />
                </label>
                <label>
                    Password:
                    <input type="password" 
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required />
                </label>
                <button type="submit">Login</button>
            </form>
            <button type="submit" onClick={handlesignup} >Registracija</button>
            <p id="error-message"></p>
        </div>
    );
}

export default Login;