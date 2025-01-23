import mongoose from 'mongoose';
const kartaSchema = new mongoose.Schema({
    dodatna_prtljaga: { type: Boolean, default: false },
    sjedalo_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sjedalo', required: true },
    vozni_red_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'VozniRed', required: true },
    korisnik_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Korisnik', required: true }
});
const Karta = mongoose.model('Karta', kartaSchema);
export default Karta;
