import express from 'express';
import Bus from '../model/bus.js';
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();

router.post('/',async(req,res)=>{
    try{
        const bus=new Bus(req.body);
        await bus.save();
        res.status(201).json(bus);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});


router.get('/', async (req, res) => {
    try {
        const busevi = await Bus.find();
        res.json(busevi);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if(!bus){
            return res.status(404).json({error:"Bus ne postoji"});
        }
        res.json(bus);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const bus=await Bus.findByIdAndDelete(req.params.id);
        if(!bus){
            return res.status(404).json({error:"Bus nije pronađen"});
        }
        res.json({message:"Bus je izbrisan"});
    }catch(e){
        res.status(500).json({error:e.message});
    }
});
export default router;