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


router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email et nouveau mot de passe requis' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Mise à jour simple (pas de hash) pour rester cohérent avec /login actuel
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur reset-password:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
export default router;