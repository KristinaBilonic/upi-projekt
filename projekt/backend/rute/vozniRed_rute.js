import express from 'express';
import VozniRed from '../model/vozniRed.js';
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();

router.post('/',async(req,res)=>{
    try{
        const vozniRed=new VozniRed(req.body);
        await vozniRed.save();
        res.status(201).json(vozniRed);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});

router.get('/',async(req,res)=>{
    try{
        const vozniRed=await VozniRed.find()
            .populate('mjesto_polaska','naziv')
            .populate('mjesto_dolaska','naziv')
            .populate('bus_ID','registracija')
        res.json(vozniRed)
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const vozniRed=await VozniRed.findById(req.params.id)
            .populate('mjesto_polaska','naziv')
            .populate('mjesto_dolaska','naziv')
            .populate('bus_ID','registracija')
        if(!vozniRed){
            return res.status(404).json({error:"vozni red ne postoji"});
        }
        res.json(vozniRed)
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const vozniRed=await VozniRed.findByIdAndUpdate(req.params.id,req.body,{new:true})
            .populate('mjesto_polaska','naziv')
            .populate('mjesto_dolaska','naziv')
            .populate('bus_ID','registracija')
        if(!vozniRed){
            return res.status(404).json({error:"vozni red ne postoji"});
        }
        res.json(vozniRed)
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const vozniRed=await VozniRed.findByIdAndDelete(req.params.id)
        if(!vozniRed){
            return res.status(404).json({error:"vozni red ne postoji"});
        }
        res.json({message: "vozni red je izbrisan"})
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

//svi buseve koji kreću iz zadanog grada
router.get('/polazak/:mjestoPolaskaID',async(req,res)=>{
    try{
        const {mjestoPolaskaID}=req.params;
        const vozniRed=await VozniRed.find({mjesto_polaska:mjestoPolaskaID})
            .populate('mjesto_polaska','naziv')
            .populate('mjesto_dolaska','naziv')
            .populate('bus_ID','registracija')
        if(vozniRed.length===0){
            return res.status(404).json({error:"Nema buseva koji kreću iz tog grada"});
        }
        res.json(vozniRed)
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

//svi buseve koji kreću iz zadanog grada na određeni datum
router.get('/polazak/:mjestoPolaskaID/datum/:datumPolaska',async(req,res)=>{
    try{
        const {mjestoPolaskaID,datumPolaska}=req.params;
        const vozniRed=await VozniRed.find({mjesto_polaska:mjestoPolaskaID,datum_polaska:new Date(datumPolaska)})
            .populate('mjesto_polaska','naziv')
            .populate('mjesto_dolaska','naziv')
            .populate('bus_ID','registracija')
        if(vozniRed.length===0){
            return res.status(404).json({error:"Nema buseva koji kreću iz tog grada na zadani datum"});
        }
        res.json(vozniRed)
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

//svi buseve koji idu u zadani grad
router.get('/dolazak/:mjestoDolaskaID',async(req,res)=>{
    try{
        const {mjestoDolaskaID}=req.params;
        const vozniRed=await VozniRed.find({mjesto_dolaska:mjestoDolaskaID})
            .populate('mjesto_polaska','naziv')
            .populate('mjesto_dolaska','naziv')
            .populate('bus_ID','registracija')
        if(vozniRed.length===0){
            return res.status(404).json({error:"Nema buseva koji idu u taj grad"});
        }
        res.json(vozniRed)
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

//svi buseve koji kreću iz zadanog grada i idu u drugi zadani grad na određeni datum
router.get('/polazak/:mjestoPolaskaID/dolazak/:mjestoDolaskaID/datum/:datumPolaska',async(req,res)=>{
    try{
        const {mjestoPolaskaID,mjestoDolaskaID,datumPolaska}=req.params;
        const vozniRed=await VozniRed.find({mjesto_polaska:mjestoPolaskaID, mjesto_dolaska:mjestoDolaskaID, datum_polaska:new Date(datumPolaska)})
            .populate('mjesto_polaska','naziv')
            .populate('mjesto_dolaska','naziv')
            .populate('bus_ID','registracija')
        if(vozniRed.length===0){
            return res.status(404).json({error:"Nema buseva koji idu zadanom rutom na taj datum"});
        }
        res.json(vozniRed)
    }catch(e){
        res.status(500).json({error:e.message});
    }
});
export default router;

