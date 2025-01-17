import mongoose from 'mongoose';
const korisnikSchema=new mongoose.Schema({
    ime: { type: String, required: true,maxlength:50},
    prezime: { type: String, required: true,maxlength:50},
    email: { type: String, required: true,maxlength:50},
    sifra: { type: String, required: true},
});

const Korisnik=mongoose.model('Korisnik',korisnikSchema);
export default Korisnik;