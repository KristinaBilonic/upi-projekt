import express from 'express';
import Korisnik from '../model/korisnik.js';
import Karta from '../model/karta.js';
import Kartica from '../model/kartica.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log("✅ prikaz_profila.js je učitan!");

// 1- prikaz profila
router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log("📢 Ruta /profil pozvana!");
        const korisnik = await Korisnik.findById(req.user.id);
        if (!korisnik) {
            console.log("❌ Korisnik nije pronađen.");
            return res.status(404).json({ error: "Korisnik nije pronađen" });
        }
        res.json(korisnik);
    } catch (e) {
        console.error("⚠️ Greška u /profil:", e.message);
        res.status(500).json({ error: e.message });
    }
});

// 2- prikaz karata korisnika
router.get('/karte', authMiddleware, async (req, res) => {
    try {
        console.log("📢 Ruta /profil/karte pozvana!");
        const karte = await Karta.find({ korisnik_ID: req.user.id }).populate('sjedalo_ID vozni_red_ID');
        res.json(karte);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 3- prikaz svih kartica korisnika
router.get('/kartice', authMiddleware, async (req, res) => {
    try {
        console.log("📢 Ruta /profil/kartice pozvana!");
        const kartice = await Kartica.find({ korisnik_ID: req.user.id });
        res.json(kartice);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
