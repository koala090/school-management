
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
    } else if (req.user.role === 'prof') {
      // Les profs voient SEULEMENT les notes de leur matière
      query.subject = req.user.subject;
    }

    const notes = await Note.find(query);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des notes' });
  }
});

// POST saisir une note (prof) - SEULEMENT SA MATIÈRE
router.post('/', verifyToken, verifyRole(['prof']), async (req, res) => {
  try {
    const { studentId, subject, cc, exam } = req.body;

    if (!studentId || !subject || cc === undefined || exam === undefined) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    // Vérifier que le prof saisit SEULEMENT ses propres notes
    if (subject !== req.user.subject) {
      return res.status(403).json({ error: `Vous ne pouvez saisir que des notes en ${req.user.subject}` });
    }

    // VÉRIFICATION: Voir si une note existe déjà pour cet étudiant dans cette matière
    const noteExistante = await Note.findOne({
      studentId: parseInt(studentId),
      subject: subject
    });

    if (noteExistante) {
      return res.status(409).json({ 
        error: `Cet étudiant a déjà une note en ${subject}. Veuillez la modifier au lieu d'en créer une nouvelle.`,
        existingNote: noteExistante._id
      });
    }

    // Calcul: CC (40%) + Examen (60%)
    const average = (cc * 0.4) + (exam * 0.6);

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
    
    // Calcul: CC (40%) + Examen (60%)
    const average = cc && exam ? (cc * 0.4) + (exam * 0.6) : undefined;

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

// Nouvelle route pour les statistiques (moyenne + classement)
router.get('/stats/:studentId', verifyToken, async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);

    // Vérifier que le parent accède seulement aux stats de son enfant
    if (req.user.role === 'parent' && req.user.childId !== studentId) {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    // Récupérer toutes les notes de l'étudiant
    const studentNotes = await Note.find({ studentId });

    if (studentNotes.length === 0) {
      return res.json({ averageGeneral: 0, rank: 'N/A', totalStudents: 0 });
    }

    // Calculer la moyenne générale de l'étudiant
    const totalAverage = studentNotes.reduce((sum, note) => sum + note.average, 0);
    const averageGeneral = totalAverage / studentNotes.length;

    // Récupérer tous les étudiants et calculer leurs moyennes
    const allNotes = await Note.find({});
    const studentAverages = {};

    allNotes.forEach(note => {
      if (!studentAverages[note.studentId]) {
        studentAverages[note.studentId] = { total: 0, count: 0 };
      }
      studentAverages[note.studentId].total += note.average;
      studentAverages[note.studentId].count += 1;
    });

    // Calculer la moyenne générale de chaque étudiant
    const averages = Object.entries(studentAverages).map(([id, data]) => ({
      studentId: parseInt(id),
      average: data.total / data.count
    }));

    // Trier par moyenne décroissante
    averages.sort((a, b) => b.average - a.average);

    // Trouver le rang de l'étudiant
    const rank = averages.findIndex(s => s.studentId === studentId) + 1;
    const totalStudents = averages.length;

    res.json({
      averageGeneral: parseFloat(averageGeneral.toFixed(2)),
      rank: `${rank}${rank === 1 ? 'er' : 'ème'}/${totalStudents}`,
      rankNumber: rank,
      totalStudents
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du calcul des statistiques' });
  }
});