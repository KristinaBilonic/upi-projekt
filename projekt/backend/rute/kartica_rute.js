import express from 'express';
import Kartica from '../model/Kartica.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Save a new card
router.post('/', async (req, res) => {
    try {
        const kartica = new Kartica(req.body);
        await kartica.save();
        res.status(201).json(kartica);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// Fetch all cards (for debugging/admin)
router.get('/', async (req, res) => {
    try {
        const kartice = await Kartica.find();
        res.json(kartice);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Fetch saved cards for a specific user
router.get('/korisnik/:korisnikID', async (req, res) => {
    try {
        const kartice = await Kartica.find({ korisnik_ID: req.params.korisnikID });
        res.json(kartice);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Fetch a single card by ID
router.get('/:id', async (req, res) => {
    try {
        const kartica = await Kartica.findById(req.params.id);
        if (!kartica) {
            return res.status(404).json({ error: "Kartica nije pronađena" });
        }
        res.json(kartica);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
router.get('/korisnik/profil/:userId', async (req, res) => {
    try {
        const kartice = await Kartica.find({ korisnik_ID: req.params.userId })
            .populate('korisnik_ID', 'ime prezime email'); // Ensure user data is populated
        
        res.json(kartice);
    } catch (error) {
        res.status(500).json({ error: "Greška pri dohvaćanju kartica korisnika." });
    }
});


// Delete a card
router.delete('/:id', async (req, res) => {
    try {
        const kartica = await Kartica.findByIdAndDelete(req.params.id);
        if (!kartica) {
            return res.status(404).json({ error: "Kartica nije pronađena" });
        }
        res.json({ message: "Kartica uspješno obrisana" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
