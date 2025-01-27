import express from 'express';
import Karta from '../model/karta.js';
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();

router.post('/', async (req, res) => {
    try {
        const karta = new Karta(req.body);
        await karta.save();
        res.status(201).json(karta);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


router.get('/',async(req,res)=>{
    try{
        const karte=await Karta.find()
            .populate('sjedalo_ID','red stupac')
            .populate('vozni_red_ID','mjesto_polaska mjesto_dolaska datum_polaska vrijeme_polaska datum_dolaska vrijeme_dolaska')
            .populate('korisnik_ID','ime prezime email')
        res.json(karte)
    }catch(e){
        res.status(500).json({error: e.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const karta = await Karta.findById(req.params.id)
            .populate('sjedalo_ID', 'red stupac')
            .populate('vozni_red_ID', 'mjesto_polaska mjesto_dolaska datum_polaska vrijeme_polaska datum_dolaska vrijeme_dolaska')
            .populate('korisnik_ID', 'ime prezime email');
        if (!karta) {
            return res.status(404).json({ error: "Nema karte sa zadanim id-om" });
        }
        res.json(karta);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const karta = await Karta.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('sjedalo_ID', 'red stupac')
            .populate('vozni_red_ID', 'mjesto_polaska mjesto_dolaska datum_polaska vrijeme_polaska datum_dolaska vrijeme_dolaska')
            .populate('korisnik_ID', 'ime prezime email');
        if (!karta) {
            return res.status(404).json({ error: "Karta not found" });
        }
        res.json(karta);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const karta = await Karta.findByIdAndDelete(req.params.id);
        if (!karta) {
            return res.status(404).json({ error: "Karta not found" });
        }
        res.json({ message: "Karta deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//sve karte koji idu istim voznim redom(istim busom od zadanog do zadanog mista)
router.get('/voznired/:vozniRedID', async (req, res) => {
    try {
        const { vozniRedID } = req.params;
        const tickets = await Karta.find({ vozni_red_ID: vozniRedID })
            .populate('sjedalo_ID', 'red stupac')
            .populate('vozni_red_ID', 'mjesto_polaska mjesto_dolaska datum_polaska vrijeme_polaska datum_dolaska vrijeme_dolaska')
            .populate('korisnik_ID', 'ime prezime email');
        if (tickets.length === 0) {
            return res.status(404).json({ message: "Nema putnika koji idu ovim busom" });
        }
        res.json(tickets);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
export default router;


