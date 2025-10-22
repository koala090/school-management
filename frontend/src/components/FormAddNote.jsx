// Exemple de formulaire pour ajouter une note
// À utiliser dans TableNotes.jsx ou un composant séparé

import { useState, useEffect } from 'react';

export default function FormAddNote({ userSubject, onSubmit }) {
  const [formData, setFormData] = useState({
    studentId: '',
    cc: '',
    exam: ''
  });
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState(userSubject || '');

  useEffect(() => {
    if (userSubject) {
      setSubject(userSubject);
    }
  }, [userSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.studentId || !formData.cc || !formData.exam) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    
    
    // Ajoute automatiquement la matière
    const dataToSend = {
      ...formData,
      subject: subject,
      cc: parseFloat(formData.cc),
      exam: parseFloat(formData.exam),
      studentId: parseInt(formData.studentId)
    };

    await onSubmit(dataToSend);
    
    // Réinitialise le formulaire
    setFormData({
      studentId: '',
      cc: '',
      exam: ''
    });
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 p-6 rounded-lg mb-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ajouter une Note</h3>
      
      {/* Affichage de la matière (lecture seule) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Matière
        </label>
        <div className="w-full px-4 py-2 bg-gray-200 border border-gray-400 rounded text-gray-700 font-semibold">
          {subject || 'Chargement...'}
        </div>
        <p className="text-xs text-gray-500 mt-1">Votre matière d'enseignement</p>
      </div>

      {/* Sélection de l'étudiant */}
      <div>
        <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2">
          Étudiant
        </label>
        <input
          type="number"
          id="studentId"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="ID de l'étudiant (1, 2, 3...)"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Note CC */}
      <div>
        <label htmlFor="cc" className="block text-sm font-semibold text-gray-700 mb-2">
          CC (sur 20)
        </label>
        <input
          type="number"
          id="cc"
          name="cc"
          value={formData.cc}
          onChange={handleChange}
          placeholder="Note CC"
          min="0"
          max="20"
          step="0.5"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Note Examen */}
      <div>
        <label htmlFor="exam" className="block text-sm font-semibold text-gray-700 mb-2">
          Examen (sur 20)
        </label>
        <input
          type="number"
          id="exam"
          name="exam"
          value={formData.exam}
          onChange={handleChange}
          placeholder="Note Examen"
          min="0"
          max="20"
          step="0.5"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Bouton soumettre */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
      >
        {loading ? 'Ajout en cours...' : '✅ Ajouter la note'}
      </button>
    </form>
  );
}