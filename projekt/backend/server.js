import express from 'express';
import dotenv  from 'dotenv';
import mongoose  from 'mongoose';
import cors from 'cors';
import korisnikRute  from './rute/korisnik_rute.js';
// import gradRute  from './rute/grad_rute.js';
// import kartaRute  from './rute/karta_rute.js';
// import karticaRute  from './rute/kartica_rute.js';
// import sjedaloRute  from './rute/sjedalo_rute.js';
// import vozniRedRute  from './rute/vozniRed_rute.js';
// import busRute  from './rute/bus_rute.js';

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());



mongoose.connect("mongodb+srv://kike:UPIprojekt@cluster0.nqzq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>console.log('spojen na mongoDb'))
    .catch((error)=>console.error('greška u povezivanju s mongoDb: ',error));

app.use('/korisnici',korisnikRute)
// app.use('/gradovi',gradRute)
// app.use('/karte',kartaRute)
// app.use('/kartice',karticaRute)
// app.use('/sjedala',sjedaloRute)
// app.use('/vozniRedovi',vozniRedRute)
// app.use('/busevi',busRute)
app.get('/', (req, res) => {
    res.send('Welcome to the Bus Ticket Booking API!');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{

    console.log('server je pokrenut na ',PORT)

})