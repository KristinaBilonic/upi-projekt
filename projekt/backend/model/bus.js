import mongoose from 'mongoose';
const busSchema=new mongoose.Schema({
    registracija:{type:String,required:true,maxlength:50}
});
const Bus=mongoose.model('Bus',busSchema);
export default Bus;