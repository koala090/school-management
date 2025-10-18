// backend/routes/notes.js
import express from 'express';
import { Note, Student } from '../config/db.js';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// GET notes pour un parent (voir notes de son enfant)
router.get('/', verifyToken, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'parent') {
      query.studentId = req.user.childId;
    }

    const notes = await Note.find(query);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des notes' });
  }
});

// POST saisir une note (prof)
router.post('/', verifyToken, verifyRole(['prof']), async (req, res) => {
  try {
    const { studentId, subject, cc, exam } = req.body;

    if (!studentId || !subject || cc === undefined || exam === undefined) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    const average = (cc + exam) / 2;

    const note = new Note({
      studentId,
      subject,
      cc,
      exam,
      average
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la note' });
  }
});

// PUT modifier une note (prof)
router.put('/:id', verifyToken, verifyRole(['prof']), async (req, res) => {
  try {
    const { cc, exam } = req.body;
    const average = cc && exam ? (cc + exam) / 2 : undefined;

    const updateData = {};
    if (cc !== undefined) updateData.cc = cc;
    if (exam !== undefined) updateData.exam = exam;
    if (average !== undefined) updateData.average = average;

    const note = await Note.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!note) {
      return res.status(404).json({ error: 'Note non trouvée' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la modification de la note' });
  }
});

// DELETE supprimer une note (prof)
router.delete('/:id', verifyToken, verifyRole(['prof']), async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note non trouvée' });
    }

    res.json({ message: 'Note supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la note' });
  }
});

export default router;