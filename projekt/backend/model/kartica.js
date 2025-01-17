import mongoose from 'mongoose';
const karticaSchema=new mongoose.Schema({
    broj:{type:String, required: true,maxlength:16},
    datum_isteka:{type:Date, required: true},
    cvv:{type:String, required: true,maxlength:3},
    korisnik_ID:{type:mongoose.Schema.Types.ObjectId,ref:'Korisnik'},
});

const Kartica=mongoose.model('Kartica',karticaSchema);
export default Kartica;