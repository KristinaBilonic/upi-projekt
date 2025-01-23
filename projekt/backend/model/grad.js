import mongoose from 'mongoose';
const gradSchema=new mongoose.Schema({
    naziv:{type:String,required: true}
});

const Grad=mongoose.model('Grad',gradSchema);
export default Grad;