// frontend/src/pages/DashboardProf.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notesAPI, absencesAPI } from '../utils/api';
import TableNotes from '../components/TableNotes';
import TableAbsences from '../components/TableAbsences';

export default function DashboardProf() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notes');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [notesRes, absencesRes] = await Promise.all([
        notesAPI.getNotes(),
        absencesAPI.getAbsences()
      ]);
      setNotes(notesRes.data);
      setAbsences(absencesRes.data);
    } catch (error) {
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (data) => {
    try {
      setError('');
      setSuccess('');
      const response = await notesAPI.createNote(data);
      setNotes([...notes, response.data]);
      setSuccess('✅ Note ajoutée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('❌ Erreur lors de l\'ajout de la note');
    }
  };

  const handleUpdateNote = async (id, data) => {
    try {
      setError('');
      setSuccess('');
      const response = await notesAPI.updateNote(id, data);
      setNotes(notes.map(n => n._id === id ? response.data : n));
      setSuccess('✅ Note modifiée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('❌ Erreur lors de la modification');
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        setError('');
        setSuccess('');
        await notesAPI.deleteNote(id);
        setNotes(notes.filter(n => n._id !== id));
        setSuccess('✅ Note supprimée');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('❌ Erreur lors de la suppression');
      }
    }
  };

  const handleAddAbsence = async (data) => {
    try {
      setError('');
      setSuccess('');
      const response = await absencesAPI.createAbsence(data);
      setAbsences([...absences, response.data]);
      setSuccess('✅ Absence enregistrée');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('❌ Erreur lors de l\'enregistrement');
    }
  };

  const handleUpdateAbsence = async (id, data) => {
    try {
      setError('');
      setSuccess('');
      const response = await absencesAPI.updateAbsence(id, data);
      setAbsences(absences.map(a => a._id === id ? response.data : a));
      setSuccess('✅ Absence modifiée');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('❌ Erreur lors de la modification');
    }
  };

  const handleDeleteAbsence = async (id) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        setError('');
        setSuccess('');
        await absencesAPI.deleteAbsence(id);
        setAbsences(absences.filter(a => a._id !== id));
        setSuccess('✅ Absence supprimée');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('❌ Erreur lors de la suppression');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">👨‍🏫 Espace Professeur</h1>
            <p className="text-sm text-gray-600">Connecté en tant que {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
          >
            🚪 Déconnexion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition ${
                activeTab === 'notes'
                  ? 'border-b-4 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📊 Gestion des Notes
            </button>
            <button
              onClick={() => setActiveTab('absences')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition ${
                activeTab === 'absences'
                  ? 'border-b-4 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ❌ Gestion des Absences
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'notes' && (
              <TableNotes
                notes={notes}
                onAdd={handleAddNote}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
                isProf={true}
              />
            )}
            {activeTab === 'absences' && (
              <TableAbsences
                absences={absences}
                onAdd={handleAddAbsence}
                onUpdate={handleUpdateAbsence}
                onDelete={handleDeleteAbsence}
                isProf={true}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}