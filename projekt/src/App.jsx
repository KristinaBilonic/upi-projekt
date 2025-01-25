import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';
import SignUp from './signup';
import JedanSmjer from './jedansmjer';
import Povratno from './povratno';
import Narudzba from './narudzba';
import PregledPrijeKupnje from './pregledPrijeKupnje';
import Ucitavanje from './ucitavanje';
import Placeno from './placeno';
import NijePlaceno from './nijePlaceno';
import Karta from './karta';
import Profil from './profil';
import PovijestKupnji from './povijestKupnji';

function App() {
  const showBackBtn = !['/', '/signup', , '/home', '/karta', '/placeno', '/nijePlaceno'].includes(location.pathname);
  const showProfile = '/home' === location.pathname;
  const [loading, setLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState(null);
  const goBack = () => history.back();
  const toProfile = () => location.pathname = '/profil';

  let passengers = ['Ana Anić', 'Ivo Ivić', 'Pero Perić'];
  return (
    <>
      {!loading && (
        <header>
          {showBackBtn && (
            <button onClick={goBack}>
              <i className="fas fa-arrow-left"></i>
            </button>
          )}
          {showProfile && (
            <button className="right" onClick={toProfile}>
              <i className="fas fa-circle-user"></i>
            </button>
          )}
          {pageTitle !== null && (
            <div className="heading">
              <h2>{pageTitle}</h2>
            </div>
          )}
        </header>
      )}

      <main className="App">
        <Router>
          <Routes>
            {/* Default route renders Login.jsx */}
            <Route path="/" element={<Login setLoading={setLoading} />} />
            {/* Home route renders Home.jsx */}
            <Route path="/home" element={<Home setPageTitle={setPageTitle} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/jedansmjer" element={<JedanSmjer />} />
            <Route path="/povratno" element={<Povratno />} />
            <Route path="/narudzba" element={<Narudzba passengers={passengers} />} />
            <Route path="/pregledPrijeKupnje" element={loading ? <Ucitavanje /> : <PregledPrijeKupnje setLoading={setLoading} />} />
            <Route path="/placeno" element={<Placeno />} />
            <Route path="/nijePlaceno" element={<NijePlaceno />} />
            <Route path="/karta" element={<Karta />} />
            <Route path="/profil" element={<Profil fullName={'Ivo Ivić'} setPageTitle={setPageTitle} />} />
            <Route path="/povijestKupnji" element={<PovijestKupnji passengers={passengers} setPageTitle={setPageTitle} />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
