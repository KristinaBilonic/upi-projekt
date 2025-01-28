import express from 'express';
import Grad from '../model/grad.js';
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();


router.post('/',async(req,res)=>{
    try{
        const grad=new Grad(req.body);
        await grad.save();
        res.status(201).json(grad);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});


router.get('/', async (req, res) => {
    try {
        const gradovi = await Grad.find();
        res.json(gradovi);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const grad = await Grad.findById(req.params.id);
        if(!grad){
            return res.status(404).json({error:"Grad ne postoji"});
        }
        res.json(grad);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const grad=await Grad.findByIdAndDelete(req.params.id);
        if(!grad){
            return res.status(404).json({error:"Grad nije pronađen"});
        }
        res.json({message:"Grad je izbrisan"});
    }catch(e){
        res.status(500).json({error:e.message});
    }
});
export default router;