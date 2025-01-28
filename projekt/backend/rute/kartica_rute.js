import express from 'express';
import Kartica from '../model/kartica.js';
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();

router.post('/',async(req,res)=>{
    try{
        const kartica=new Kartica(req.body);
        await kartica.save();
        res.status(201).json(kartica);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});


router.get('/', async (req, res) => {
    try {
        const kartice = await Kartica.find().populate('korisnik_ID');
        res.json(kartice);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const kartica = await Kartica.findById(req.params.id).populate('korisnik_ID');
        if(!kartica){
            return res.status(404).json({error:"Kartica ne postoji"});
        }
        res.json(kartica);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const kartica=await Kartica.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!kartica){
            return res.status(404).json({error:"kartica nije pronađena"});
        }
        res.json(kartica);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const kartica=await Kartica.findByIdAndDelete(req.params.id);
        if(!kartica){
            return res.status(404).json({error:"Kartica nije pronađena"});
        }
        res.json({message:"Kartica je izbrisana"});
    }catch(e){
        res.status(500).json({error:e.message});
    }
});
export default router;