// frontend/src/pages/DashboardProf.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notesAPI, absencesAPI } from '../utils/api';
import TableNotes from '../components/TableNotes';
import TableAbsences from '../components/TableAbsences';
import FormAddNote from '../components/FormAddNote';
import FormAddAbsence from '../components/FormAddAbsence';

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

  const showNotification = (message, isSuccess = true) => {
    if (isSuccess) {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleAddNote = async (data) => {
    try {
      const response = await notesAPI.createNote(data);
      setNotes([response.data, ...notes]);
      showNotification('✅ Note ajoutée avec succès');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erreur lors de l\'ajout';
      showNotification(errorMsg, false);
    }
  };

  const handleUpdateNote = async (id, data) => {
    try {
      const response = await notesAPI.updateNote(id, data);
      setNotes(notes.map(n => n._id === id ? response.data : n));
      showNotification('✅ Note modifiée');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erreur lors de la modification';
      showNotification(errorMsg, false);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        await notesAPI.deleteNote(id);
        setNotes(notes.filter(n => n._id !== id));
        showNotification('✅ Note supprimée');
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Erreur lors de la suppression';
        showNotification(errorMsg, false);
      }
    }
  };

  const handleAddAbsence = async (data) => {
    try {
      const response = await absencesAPI.createAbsence(data);
      setAbsences([response.data, ...absences]);
      showNotification('✅ Absence enregistrée');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erreur lors de l\'enregistrement';
      showNotification(errorMsg, false);
    }
  };

  const handleUpdateAbsence = async (id, data) => {
    try {
      const response = await absencesAPI.updateAbsence(id, data);
      setAbsences(absences.map(a => a._id === id ? response.data : a));
      showNotification('✅ Absence modifiée');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erreur lors de la modification';
      showNotification(errorMsg, false);
    }
  };

  const handleDeleteAbsence = async (id) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        await absencesAPI.deleteAbsence(id);
        setAbsences(absences.filter(a => a._id !== id));
        showNotification('✅ Absence supprimée');
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Erreur lors de la suppression';
        showNotification(errorMsg, false);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
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
            <h1 className="text-3xl font-bold text-gray-800">👨‍🏫 Espace Professeur</h1>
            <p className="text-sm text-gray-600">Connecté en tant que {user?.email}</p>
            <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              📚 Matière: {user?.subject || 'Non définie'}
            </div>
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
        {/* Notifications */}
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
              <div>
                <FormAddNote 
                  userSubject={user?.subject} 
                  onSubmit={handleAddNote}
                />
                <TableNotes
                  notes={notes}
                  onUpdate={handleUpdateNote}
                  onDelete={handleDeleteNote}
                  isProf={true}
                />
              </div>
            )}
            {activeTab === 'absences' && (
              <div>
                <FormAddAbsence 
                  userSubject={user?.subject} 
                  onSubmit={handleAddAbsence}
                />
                <TableAbsences
                  absences={absences}
                  onUpdate={handleUpdateAbsence}
                  onDelete={handleDeleteAbsence}
                  isProf={true}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}