import express from 'express';
import Korisnik from '../model/korisnik.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();


router.post('/',async(req,res)=>{
    try{
        const korisnik=new Korisnik(req.body);
        await korisnik.save();
        res.status(201).json(korisnik);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});

//registracija
router.post('/registracija',async(req,res)=>{
    try{
        const{ime,prezime,email,sifra}=req.body;
        const postojiLiKorisnik=await Korisnik.findOne({email});
        if(postojiLiKorisnik){
            return res.status(400).json({error:'Postoji korisnik s ovim emailom'})
        }
        const sifriranaSifra=await bcrypt.hash(sifra,10);

        const korisnik=new Korisnik({
            ime,
            prezime,
            email,
            sifra:sifriranaSifra,
        });
        await korisnik.save();

        res.status(201).json({
            _id:korisnik._id,
            ime:korisnik.ime,
            prezime:korisnik.prezime,
            email:korisnik.email,
        });
    }catch(e){
        res.status(400).json({error:e.message});
    }
});

//prijava
router.post('/prijava',async(req,res)=>{
    try{
        const{email,sifra}=req.body;
        const korisnik=await Korisnik.findOne({email});
        if(!korisnik)
        {
            return res.status(404).json({error:"Korisnik s ovim emailom ne postoji"});
        }

        const tocnostSifre=await bcrypt.compare(sifra,korisnik.sifra);
        if(!tocnostSifre){
            return res.status(401).json({error:"Pogrešna lozinka"});
        }

        const token=jwt.sign(
            {id:korisnik._id},
            "hashsifralalalalalala",
            {expiresIn:'1h'}
        );
        res.json({
            token,
            user:{
                _id:korisnik._id,
                ime:korisnik.ime,
                prezime:korisnik.prezime,
                email:korisnik.email,
            },
        });
    }catch(e){
        res.status(500).json({error:e.message});
    }
})

//dohvaća sve korisnike
router.get('/',async(req,res)=>{
    try{
        const korisnici=await Korisnik.find();
        res.json(korisnici);
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

//dohvaća korisnika po id-u
router.get('/:id',async(req,res)=>{
    try{
        const korisnik=await Korisnik.findById(req.params.id);
        if(!korisnik){
            return res.status(404).json({error:"Korisnik ne postoji"});
        }
        res.json(korisnik);
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

//update-a korisnika
router.put('/:id',async(req,res)=>{
    try{
        const korisnik=await Korisnik.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!korisnik){
            return res.status(404).json({error:"Korisnik nije pronađen"});
        }
        res.json(korisnik);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});

//briše korisnika
router.delete('/:id',async(req,res)=>{
    try{
        const korisnik=await Korisnik.findByIdAndDelete(req.params.id);
        if(!korisnik){
            return res.status(404).json({error:"Korisnik nije pronađen"});
        }
        res.json({message:"Korisnik je izbrisan"});
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

export default router;