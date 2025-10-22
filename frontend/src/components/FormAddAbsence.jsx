// frontend/src/components/FormAddAbsence.jsx
import { useState, useEffect } from 'react';

export default function FormAddAbsence({ userSubject, onSubmit }) {
  const [formData, setFormData] = useState({
    studentId: '',
    date: '',
    status: 'absent'
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
    
    if (!formData.studentId || !formData.date) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    
    // Ajoute automatiquement la matière
    const dataToSend = {
      ...formData,
      subject: subject,
      studentId: parseInt(formData.studentId),
      date: new Date(formData.date)
    };

    await onSubmit(dataToSend);
    
    // Réinitialise le formulaire
    setFormData({
      studentId: '',
      date: '',
      status: 'absent'
    });
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-red-50 p-6 rounded-lg mb-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Enregistrer une Absence</h3>
      
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
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
          required
        />
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
          required
        />
      </div>

      {/* Statut */}
      <div>
        <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
          Statut
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
        >
          <option value="absent">❌ Absent</option>
          <option value="justified">⚠️ Justifié</option>
          <option value="present">✅ Présent</option>
        </select>
      </div>

      {/* Bouton soumettre */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
      >
        {loading ? 'Enregistrement...' : '✅ Enregistrer l\'absence'}
      </button>
    </form>
  );
}