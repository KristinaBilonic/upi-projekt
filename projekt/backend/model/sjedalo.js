import mongoose from 'mongoose';
const sjedaloSchema=new mongoose.Schema({
    red:{type:Number,required:true},
    stupac:{type:Number,required:true},
    rezervirano:{type:Boolean,default:false},
    bus_ID:{type:mongoose.Schema.Types.ObjectId,ref:'Bus',required:true}
});
const Sjedalo=mongoose.model('Sjedalo',sjedaloSchema);
export default Sjedalo;