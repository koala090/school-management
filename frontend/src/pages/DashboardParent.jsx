// frontend/src/pages/DashboardParent.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notesAPI, absencesAPI } from '../utils/api';
import TableNotes from '../components/TableNotes';
import TableAbsences from '../components/TableAbsences';
import WeeklySchedule from '../components/Weeklyschedule';

export default function DashboardParent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [absences, setAbsences] = useState([]);
  const [stats, setStats] = useState({ averageGeneral: 0, rank: 'N/A' });
  const [absenceStats, setAbsenceStats] = useState({ total: 0, absents: 0, justified: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notes');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [notesRes, absencesRes, statsRes] = await Promise.all([
        notesAPI.getNotes(),
        absencesAPI.getAbsences(),
        notesAPI.getStats(user?.childId)
      ]);
      setNotes(notesRes.data);
      setAbsences(absencesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const calculateAverage = () => {
    return stats.averageGeneral || 0;
  };

  const calculateRank = () => {
    return stats.rank || 'N/A';
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
            <h1 className="text-2xl font-bold text-gray-800">👨‍👧 Espace Parent</h1>
            <p className="text-sm text-gray-600">Connecté en tant que {user?.email}</p>
            <p className="text-sm text-blue-600 font-semibold">ID Enfant: {user?.childId}</p>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-100 rounded-lg p-6">
            <p className="text-gray-600 text-sm">Moyenne générale</p>
            <p className="text-4xl font-bold text-blue-600">{calculateAverage()}/20</p>
          </div>
          <div className="bg-green-100 rounded-lg p-6">
            <p className="text-gray-600 text-sm">Classement</p>
            <p className="text-4xl font-bold text-green-600">{calculateRank()}</p>
          </div>
        </div>

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
              📊 Notes
            </button>
            <button
              onClick={() => setActiveTab('absences')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition ${
                activeTab === 'absences'
                  ? 'border-b-4 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ❌ Absences
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'notes' && (
              <TableNotes notes={notes} isProf={false} />
            )}
  {activeTab === 'absences' && (
    <div className="space-y-6">
      <WeeklySchedule absences={absences} />
      <TableAbsences absences={absences} isProf={false} />
    </div>
  )}
          </div>
        </div>
      </main>
    </div>
  );
}