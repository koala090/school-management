// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../config/db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Construire les données du token
    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role,
      childId: user.childId,
      subject: user.subject
    };

    const token = jwt.sign(
      tokenData,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        childId: user.childId,
        subject: user.subject
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;