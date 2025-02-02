import mongoose from 'mongoose';
const vozniRedSchema = new mongoose.Schema({
    mjesto_polaska: { type: mongoose.Schema.Types.ObjectId, ref: 'Grad', required: true },
    mjesto_dolaska: { type: mongoose.Schema.Types.ObjectId, ref: 'Grad', required: true },
    datum_polaska: { type: Date, required: true },
    datum_dolaska: { type: Date, required: true },
    vrijeme_polaska: { type: String, required: true },
    vrijeme_dolaska: { type: String, required: true },
    bus_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    cijena: { type: Number, required: true, default: 0 }
});
const VozniRed = mongoose.model('VozniRed', vozniRedSchema);
export default VozniRed;
