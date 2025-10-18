// backend/routes/absences.js
import express from 'express';
import { Absence } from '../config/db.js';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// GET absences pour un parent
router.get('/', verifyToken, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'parent') {
      query.studentId = req.user.childId;
    }

    const absences = await Absence.find(query).sort({ date: -1 });
    res.json(absences);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des absences' });
  }
});

// POST marquer une absence (prof)
router.post('/', verifyToken, verifyRole(['prof']), async (req, res) => {
  try {
    const { studentId, subject, date, status } = req.body;

    if (!studentId || !subject || !date) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    const absence = new Absence({
      studentId,
      subject,
      date: new Date(date),
      status: status || 'absent'
    });

    await absence.save();
    res.status(201).json(absence);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'absence' });
  }
});

// PUT modifier une absence (prof - justification)
router.put('/:id', verifyToken, verifyRole(['prof']), async (req, res) => {
  try {
    const { status } = req.body;

    if (!['absent', 'present', 'justified'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }

    const absence = await Absence.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!absence) {
      return res.status(404).json({ error: 'Absence non trouvée' });
    }

    res.json(absence);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la modification de l\'absence' });
  }
});

// DELETE supprimer une absence (prof)
router.delete('/:id', verifyToken, verifyRole(['prof']), async (req, res) => {
  try {
    const absence = await Absence.findByIdAndDelete(req.params.id);

    if (!absence) {
      return res.status(404).json({ error: 'Absence non trouvée' });
    }

    res.json({ message: 'Absence supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'absence' });
  }
});

export default router;