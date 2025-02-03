import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import korisnikRute from './rute/korisnik_rute.js';
import gradRute from './rute/grad_rute.js';
import kartaRute from './rute/karta_rute.js';
import karticaRute from './rute/kartica_rute.js';
import sjedaloRute from './rute/sjedalo_rute.js';
import vozniRedRute from './rute/vozniRed_rute.js';
import busRute from './rute/bus_rute.js';
import prikazProfila from './rute/prikaz_profila.js';
import path from 'path';

dotenv.config();

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/korisnici', korisnikRute);
app.use('/gradovi', gradRute);
app.use('/karte', kartaRute);
app.use('/kartice', karticaRute);
app.use('/sjedala', sjedaloRute);
app.use('/vozniRedovi', vozniRedRute);
app.use('/busevi', busRute);
app.use('/profil', prikazProfila);

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/bus_tickets";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Spojen na MongoDB'))
    .catch((error) => console.error('❌ Greška u povezivanju s MongoDB: ', error));

app.get('/', (req, res) => {
    res.send('🚍 Welcome to the Bus Ticket Booking API!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Nešto je pošlo po zlu!' });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server je pokrenut na portu ${PORT}`);
});


app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log("✅ Registrovana ruta:", r.route.path);
    }
});
