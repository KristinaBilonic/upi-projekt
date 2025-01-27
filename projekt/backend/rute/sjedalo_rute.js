import express from 'express';
import Sjedalo from '../model/sjedalo.js';
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();


router.post('/',async(req,res)=>{
    try{
        const sjedalo=new Sjedalo(req.body);
        await sjedalo.save();
        res.status(201).json(sjedalo);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});


router.get('/', async (req, res) => {
    try {
        const sjedala = await Sjedalo.find().populate('bus_ID');
        res.json(sjedala);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const sjedalo = await Sjedalo.findById(req.params.id).populate('bus_ID');
        if(!sjedalo){
            return res.status(404).json({error:"Sjedalo ne postoji"});
        }
        res.json(sjedalo);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const sjedalo=await Sjedalo.findByIdAndDelete(req.params.id);
        if(!sjedalo){
            return res.status(404).json({error:"Sjedalo nije pronađena"});
        }
        res.json({message:"sjedalo je izbrisano"});
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

//dohvaća sva sjedala u specifičnom busu
router.get('/bus/:busID/sjedala',async(req,res)=>{
    try{
        const {busID}=req.params;
        const sjedala=await Sjedalo.find({bus_ID:busID});
        if(sjedala.length===0){
            return res.status(404).json({message:"Nema sjedala u ovom busu"});
        }
        res.json(sjedala)
    }catch(e){
        res.status(500).json({error:e.message});
    }
})

//dohvaća sva nerezervirana sjedala u busu
router.get('/bus/:busID/sjedala/neRezervirano',async(req,res)=>{
    try{
        const {busID}=req.params;
        const sjedala=await Sjedalo.find({bus_ID:busID,rezervirano:false});
        if(sjedala.length===0){
            return res.status(404).json({message:"Nema nerezerviranih sjedala u ovom busu"});
        }
        res.json(sjedala)
    }catch(e){
        res.status(500).json({error:e.message});
    }
})

//dohvaća sva rezervirana sjedala u busu
router.get('/bus/:busID/sjedala/rezervirana',async(req,res)=>{
    try{
        const {busID}=req.params;
        const sjedala=await Sjedalo.find({bus_ID:busID,rezervirano:true});
        if(sjedala.length===0){
            return res.status(404).json({message:"Nema rezerviranih sjedala u ovom busu"});
        }
        res.json(sjedala)
    }catch(e){
        res.status(500).json({error:e.message});
    }
})

export default router;