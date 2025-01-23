import React from 'react';

function Login() {
    //kod koji je bitan za komponentu kad je pokrenuta aplikacija dolazi unutar funkcije

    const loginAction = (event) => {
        event.preventDefault(); // Sprječavanje standard. ponašanja forme

        // Dohvaćanje forme i elementa za prikaz greške
        //const loginForm = document.getElementById('login-form');
        const errorMessage = document.getElementById('error-message');

        // Dohvaćanje podataka iz forme
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Provjera kredencijala (zamjena za poziv API-ja)
        if (username === 'admin' && password === 'password') {
            // Uspješna prijava, možete preusmjeriti korisnika na drugu stranicu
            //window.location.href = 'dashboard.html';
            alert('Prijavili ste se...');
        } else {
            // Neuspješna prijava, prikaz poruke greške
            errorMessage.textContent = 'Invalid username or password.';
        }
    };

    //JSX - Javascript XML notation
    return (
        <div className="login-container">
            <h1>Login</h1>
            <form id="login-form" onSubmit={loginAction}>
                <label>

                    Username:
                    <input type="text" id="username" name="username" required />
                </label>
                <label>
                    Password:
                    <input type="password" id="password" name="password" required />
                </label>
                <button type="submit">Login</button>
            </form>
            <p id="error-message"></p>
        </div>
    );
}

export default Login;