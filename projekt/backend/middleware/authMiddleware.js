import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("🔹 Primljen Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("❌ Nema tokena u Authorization headeru!");
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const jwtSecret = process.env.JWT_KLJUC || 'tajni_kljuc';

        if (!process.env.JWT_KLJUC) {
            console.warn("⚠️ Upozorenje: JWT_KLJUC nije postavljen u .env datoteci. Koristi se defaultni ključ!");
        }

        console.log("🔑 Koristi se JWT_KLJUC:", jwtSecret);

        const decoded = jwt.verify(token, jwtSecret);

        console.log("✅ Token dekodiran:", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.log("❌ Greška pri verifikaciji tokena:", error.message);
        
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ error: "Token istekao" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ error: "Neispravan token" });
        } else {
            return res.status(403).json({ error: "Autentifikacija nije uspjela" });
        }
    }
};
