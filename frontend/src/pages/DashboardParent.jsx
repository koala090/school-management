// // // frontend/src/pages/DashboardParent.jsx

// // import { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import { notesAPI, absencesAPI } from '../utils/api';
// // import TableNotes from '../components/TableNotes';
// // import TableAbsences from '../components/TableAbsences';
// // import WeeklySchedule from '../components/Weeklyschedule';

// // export default function DashboardParent() {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [notes, setNotes] = useState([]);
// //   const [absences, setAbsences] = useState([]);
// //   const [stats, setStats] = useState({ averageGeneral: 0, rank: 'N/A' });
// //   const [absenceStats, setAbsenceStats] = useState({ total: 0, absents: 0, justified: 0 });
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState('notes');

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const [notesRes, absencesRes, statsRes] = await Promise.all([
// //         notesAPI.getNotes(),
// //         absencesAPI.getAbsences(),
// //         notesAPI.getStats(user?.childId)
// //       ]);
// //       setNotes(notesRes.data);
// //       setAbsences(absencesRes.data);
// //       setStats(statsRes.data);
// //     } catch (error) {
// //       console.error('Erreur:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/login');
// //   };

// //   const calculateAverage = () => {
// //     return stats.averageGeneral || 0;
// //   };

// //   const calculateRank = () => {
// //     return stats.rank || 'N/A';
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <p className="text-xl text-gray-600">Chargement...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white shadow-md">
// //         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-800">👨‍👧 Espace Parent</h1>
// //             <p className="text-sm text-gray-600">Connecté en tant que {user?.email}</p>
// //             <p className="text-sm text-blue-600 font-semibold">ID Enfant: {user?.childId}</p>
// //           </div>
// //           <button
// //             onClick={handleLogout}
// //             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
// //           >
// //             🚪 Déconnexion
// //           </button>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-6 py-8">
// //         {/* Stats */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
// //           <div className="bg-blue-100 rounded-lg p-6">
// //             <p className="text-gray-600 text-sm">Moyenne générale</p>
// //             <p className="text-4xl font-bold text-blue-600">{calculateAverage()}/20</p>
// //           </div>
// //           <div className="bg-green-100 rounded-lg p-6">
// //             <p className="text-gray-600 text-sm">Classement</p>
// //             <p className="text-4xl font-bold text-green-600">{calculateRank()}</p>
// //           </div>
// //         </div>

// //         {/* Tabs */}
// //         <div className="bg-white rounded-lg shadow-md">
// //           <div className="flex border-b">
// //             <button
// //               onClick={() => setActiveTab('notes')}
// //               className={`flex-1 py-4 px-6 font-semibold text-center transition ${
// //                 activeTab === 'notes'
// //                   ? 'border-b-4 border-blue-500 text-blue-600'
// //                   : 'text-gray-600 hover:text-gray-800'
// //               }`}
// //             >
// //               📊 Notes
// //             </button>
// //             <button
// //               onClick={() => setActiveTab('absences')}
// //               className={`flex-1 py-4 px-6 font-semibold text-center transition ${
// //                 activeTab === 'absences'
// //                   ? 'border-b-4 border-blue-500 text-blue-600'
// //                   : 'text-gray-600 hover:text-gray-800'
// //               }`}
// //             >
// //               ❌ Absences
// //             </button>
// //           </div>

// //           <div className="p-6">
// //             {activeTab === 'notes' && (
// //               <TableNotes notes={notes} isProf={false} />
// //             )}
// //   {activeTab === 'absences' && (
// //     <div className="space-y-6">
// //       <WeeklySchedule absences={absences} />
// //       <TableAbsences absences={absences} isProf={false} />
// //     </div>
// //   )}
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// // frontend/src/pages/DashboardParent.jsx
// // frontend/src/pages/DashboardParent.jsx
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { notesAPI, absencesAPI } from '../utils/api';
// import TableNotes from '../components/TableNotes';
// import TableAbsences from '../components/TableAbsences';
// import WeeklySchedule from '../components/Weeklyschedule';

// export default function DashboardParent() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [notes, setNotes] = useState([]);
//   const [absences, setAbsences] = useState([]);
//   const [stats, setStats] = useState({ averageGeneral: 0, rank: 'N/A' });
//   const [absenceStats, setAbsenceStats] = useState({ total: 0, absents: 0, justified: 0 });
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('notes');

//   useEffect(() => {
//     fetchData();
//     // Rafraîchir les données toutes les 5 secondes
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [notesRes, absencesRes, statsRes, absenceStatsRes] = await Promise.all([
//         notesAPI.getNotes(),
//         absencesAPI.getAbsences(),
//         notesAPI.getStats(user?.childId),
//         absencesAPI.getStats(user?.childId)
//       ]);
//       setNotes(notesRes.data);
//       setAbsences(absencesRes.data);
//       setStats(statsRes.data);
//       setAbsenceStats(absenceStatsRes.data);
//     } catch (error) {
//       console.error('Erreur:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-700 font-semibold">Chargement des données...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-xl">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-4xl font-bold text-white mb-2">Suivi Scolaire</h1>
//               <p className="text-purple-100">Bienvenue {user?.email}</p>
//               <p className="text-purple-100 text-sm mt-2">ID Enfant: <span className="font-bold">{user?.childId}</span></p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-white hover:bg-gray-100 text-purple-600 font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md"
//             >
//               Déconnexion
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition">
//             <p className="text-gray-600 text-sm font-semibold">Moyenne Générale</p>
//             <p className="text-5xl font-bold text-blue-600 mt-2">{stats.averageGeneral || 0}/20</p>
//             <p className="text-xs text-gray-500 mt-2">Calcul: CC (40%) + Examen (60%)</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition">
//             <p className="text-gray-600 text-sm font-semibold">Classement</p>
//             <p className="text-4xl font-bold text-green-600 mt-2">{stats.rank || 'N/A'}</p>
//             <p className="text-xs text-gray-500 mt-2">Position parmi les élèves</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition">
//             <p className="text-gray-600 text-sm font-semibold">Absences</p>
//             <p className="text-5xl font-bold text-orange-600 mt-2">{absenceStats.absents || 0}</p>
//             <p className="text-xs text-gray-500 mt-2">Total: {absenceStats.total}</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition">
//             <p className="text-gray-600 text-sm font-semibold">Justifiées</p>
//             <p className="text-5xl font-bold text-purple-600 mt-2">{absenceStats.justified || 0}</p>
//             <p className="text-xs text-gray-500 mt-2">Absences justifiées</p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//           <div className="flex border-b-2 border-gray-200">
//             <button
//               onClick={() => setActiveTab('notes')}
//               className={`flex-1 py-5 px-6 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
//                 activeTab === 'notes'
//                   ? 'bg-blue-500 text-white border-b-4 border-blue-700'
//                   : 'text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <span className="text-xl">📊</span> Notes
//             </button>
//             <button
//               onClick={() => setActiveTab('absences')}
//               className={`flex-1 py-5 px-6 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
//                 activeTab === 'absences'
//                   ? 'bg-orange-500 text-white border-b-4 border-orange-700'
//                   : 'text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <span className="text-xl">❌</span> Absences
//             </button>
//           </div>

//           <div className="p-8">
//             {activeTab === 'notes' && (
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6">Vos Notes</h3>
//                 <TableNotes notes={notes} isProf={false} />
//               </div>
//             )}

//             {activeTab === 'absences' && (
//               <div className="space-y-8">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-6">Emploi du Temps & Absences</h3>
//                   <WeeklySchedule absences={absences} />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-6">Détail des Absences</h3>
//                   <TableAbsences absences={absences} isProf={false} />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

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
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fonction pour récupérer les données
  const fetchData = async (silent = false) => {
    if (!silent) {
      setIsRefreshing(true);
    }
    
    try {
      const [notesRes, absencesRes, statsRes, absenceStatsRes] = await Promise.all([
        notesAPI.getNotes(),
        absencesAPI.getAbsences(),
        notesAPI.getStats(user?.childId),
        absencesAPI.getStats(user?.childId)
      ]);
      
      setNotes(notesRes.data);
      setAbsences(absencesRes.data);
      setStats(statsRes.data);
      setAbsenceStats(absenceStatsRes.data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Chargement initial
  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(true); // silent = true pour ne pas afficher le loader
    }, 10000); // 10 secondes

    return () => clearInterval(interval);
  }, [user?.childId]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleManualRefresh = () => {
    fetchData(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Suivi Scolaire</h1>
              <p className="text-purple-100">Bienvenue {user?.email}</p>
              <p className="text-purple-100 text-sm mt-2">ID Enfant: <span className="font-bold">{user?.childId}</span></p>
              
              {/* Indicateur de dernière mise à jour */}
              <div className="mt-3 flex items-center gap-3">
                <div className="text-xs text-purple-100">
                  Dernière MAJ: {lastUpdate ? lastUpdate.toLocaleTimeString('fr-FR') : '-'}
                </div>
                {isRefreshing && (
                  <div className="flex items-center gap-2 text-yellow-300">
                    <div className="w-3 h-3 border-2 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs">Actualisation...</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              {/* Bouton Actualiser */}
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🔄 Actualiser
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-white hover:bg-gray-100 text-purple-600 font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Notification d'auto-refresh */}
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="text-sm font-semibold text-blue-800">Actualisation automatique activée</p>
              <p className="text-xs text-blue-600">Les données se mettent à jour toutes les 10 secondes automatiquement</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition">
            <p className="text-gray-600 text-sm font-semibold">Moyenne Générale</p>
            <p className="text-5xl font-bold text-blue-600 mt-2">{stats.averageGeneral || 0}/20</p>
            <p className="text-xs text-gray-500 mt-2">Calcul: CC (40%) + Examen (60%)</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition">
            <p className="text-gray-600 text-sm font-semibold">Classement</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{stats.rank || 'N/A'}</p>
            <p className="text-xs text-gray-500 mt-2">Position parmi les élèves</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition">
            <p className="text-gray-600 text-sm font-semibold">Absences</p>
            <p className="text-5xl font-bold text-orange-600 mt-2">{absenceStats.absents || 0}</p>
            <p className="text-xs text-gray-500 mt-2">Total: {absenceStats.total}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition">
            <p className="text-gray-600 text-sm font-semibold">Justifiées</p>
            <p className="text-5xl font-bold text-purple-600 mt-2">{absenceStats.justified || 0}</p>
            <p className="text-xs text-gray-500 mt-2">Absences justifiées</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-5 px-6 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'notes'
                  ? 'bg-blue-500 text-white border-b-4 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">📊</span> Notes
            </button>
            <button
              onClick={() => setActiveTab('absences')}
              className={`flex-1 py-5 px-6 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'absences'
                  ? 'bg-orange-500 text-white border-b-4 border-orange-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">❌</span> Absences
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'notes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Vos Notes</h3>
                  {isRefreshing && (
                    <span className="text-sm text-blue-600 animate-pulse">Mise à jour en cours...</span>
                  )}
                </div>
                <TableNotes notes={notes} isProf={false} />
              </div>
            )}

            {activeTab === 'absences' && (
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Emploi du Temps & Absences</h3>
                    {isRefreshing && (
                      <span className="text-sm text-blue-600 animate-pulse">Mise à jour en cours...</span>
                    )}
                  </div>
                  <WeeklySchedule absences={absences} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Détail des Absences</h3>
                  <TableAbsences absences={absences} isProf={false} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}