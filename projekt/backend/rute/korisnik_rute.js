import express from 'express';
import Korisnik from '../model/korisnik.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Pristup odbijen! Nema tokena." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_KLJUC || "tajna");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Nevažeći token!" });
    }
};

// Prijava
router.post('/prijava', async (req, res) => {
    try {
        const { email, sifra } = req.body;
        const korisnik = await Korisnik.findOne({ email });

        if (!korisnik) {
            return res.status(404).json({ error: "Korisnik s ovim emailom ne postoji" });
        }

        const tocnostSifre = await bcrypt.compare(sifra, korisnik.sifra);
        if (!tocnostSifre) {
            return res.status(401).json({ error: "Pogrešna lozinka" });
        }

        const token = jwt.sign(
            { id: korisnik._id },
            process.env.JWT_KLJUC || "tajna",
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                _id: korisnik._id,
                ime: korisnik.ime,
                prezime: korisnik.prezime,
                email: korisnik.email,
            },
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


router.get("/profil", authMiddleware, async (req, res) => {
    try {
        const korisnik = await Korisnik.findById(req.user.id).select("-sifra"); 
        if (!korisnik) {
            return res.status(404).json({ error: "Korisnik nije pronađen." });
        }

        res.json(korisnik); 
    } catch (error) {
        res.status(500).json({ error: "Greška na serveru." });
    }
});


export default router;