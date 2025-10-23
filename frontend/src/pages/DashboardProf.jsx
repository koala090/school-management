// // frontend/src/pages/DashboardProf.jsx
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { notesAPI, absencesAPI } from '../utils/api';
// import TableNotes from '../components/TableNotes';
// import TableAbsences from '../components/TableAbsences';
// import FormAddNote from '../components/FormAddNote';
// import FormAddAbsence from '../components/FormAddAbsence';

// export default function DashboardProf() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [notes, setNotes] = useState([]);
//   const [absences, setAbsences] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('notes');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [notesRes, absencesRes] = await Promise.all([
//         notesAPI.getNotes(),
//         absencesAPI.getAbsences()
//       ]);
//       setNotes(notesRes.data);
//       setAbsences(absencesRes.data);
//     } catch (error) {
//       setError('Erreur lors du chargement des données');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showNotification = (message, isSuccess = true) => {
//     if (isSuccess) {
//       setSuccess(message);
//       setTimeout(() => setSuccess(''), 3000);
//     } else {
//       setError(message);
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleAddNote = async (data) => {
//     try {
//       const response = await notesAPI.createNote(data);
//       setNotes([response.data, ...notes]);
//       showNotification('✅ Note ajoutée avec succès');
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || 'Erreur lors de l\'ajout';
//       showNotification(errorMsg, false);
//     }
//   };

//   const handleUpdateNote = async (id, data) => {
//     try {
//       const response = await notesAPI.updateNote(id, data);
//       setNotes(notes.map(n => n._id === id ? response.data : n));
//       showNotification('✅ Note modifiée');
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || 'Erreur lors de la modification';
//       showNotification(errorMsg, false);
//     }
//   };

//   const handleDeleteNote = async (id) => {
//     if (window.confirm('Êtes-vous sûr ?')) {
//       try {
//         await notesAPI.deleteNote(id);
//         setNotes(notes.filter(n => n._id !== id));
//         showNotification('✅ Note supprimée');
//       } catch (err) {
//         const errorMsg = err.response?.data?.error || 'Erreur lors de la suppression';
//         showNotification(errorMsg, false);
//       }
//     }
//   };

//   const handleAddAbsence = async (data) => {
//     try {
//       const response = await absencesAPI.createAbsence(data);
//       setAbsences([response.data, ...absences]);
//       showNotification('✅ Absence enregistrée');
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || 'Erreur lors de l\'enregistrement';
//       showNotification(errorMsg, false);
//     }
//   };

//   const handleUpdateAbsence = async (id, data) => {
//     try {
//       const response = await absencesAPI.updateAbsence(id, data);
//       setAbsences(absences.map(a => a._id === id ? response.data : a));
//       showNotification('✅ Absence modifiée');
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || 'Erreur lors de la modification';
//       showNotification(errorMsg, false);
//     }
//   };

//   const handleDeleteAbsence = async (id) => {
//     if (window.confirm('Êtes-vous sûr ?')) {
//       try {
//         await absencesAPI.deleteAbsence(id);
//         setAbsences(absences.filter(a => a._id !== id));
//         showNotification('✅ Absence supprimée');
//       } catch (err) {
//         const errorMsg = err.response?.data?.error || 'Erreur lors de la suppression';
//         showNotification(errorMsg, false);
//       }
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <p className="text-xl text-gray-600">Chargement...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">👨‍🏫 Espace Professeur</h1>
//             <p className="text-sm text-gray-600">Connecté en tant que {user?.email}</p>
//             <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
//               📚 Matière: {user?.subject || 'Non définie'}
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
//           >
//             🚪 Déconnexion
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Notifications */}
//         {error && (
//           <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//             {success}
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="bg-white rounded-lg shadow-md">
//           <div className="flex border-b">
//             <button
//               onClick={() => setActiveTab('notes')}
//               className={`flex-1 py-4 px-6 font-semibold text-center transition ${
//                 activeTab === 'notes'
//                   ? 'border-b-4 border-blue-500 text-blue-600'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               📊 Gestion des Notes
//             </button>
//             <button
//               onClick={() => setActiveTab('absences')}
//               className={`flex-1 py-4 px-6 font-semibold text-center transition ${
//                 activeTab === 'absences'
//                   ? 'border-b-4 border-blue-500 text-blue-600'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               ❌ Gestion des Absences
//             </button>
//           </div>

//           <div className="p-6">
//             {activeTab === 'notes' && (
//               <div>
//                 <FormAddNote 
//                   userSubject={user?.subject} 
//                   onSubmit={handleAddNote}
//                 />
//                 <TableNotes
//                   notes={notes}
//                   onUpdate={handleUpdateNote}
//                   onDelete={handleDeleteNote}
//                   isProf={true}
//                 />
//               </div>
//             )}
//             {activeTab === 'absences' && (
//               <div>
//                 <FormAddAbsence 
//                   userSubject={user?.subject} 
//                   onSubmit={handleAddAbsence}
//                 />
//                 <TableAbsences
//                   absences={absences}
//                   onUpdate={handleUpdateAbsence}
//                   onDelete={handleDeleteAbsence}
//                   isProf={true}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

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
      const errorMsg = err.response?.data?.error || 'Erreur';
      showNotification(errorMsg, false);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      try {
        await notesAPI.deleteNote(id);
        setNotes(notes.filter(n => n._id !== id));
        showNotification('✅ Note supprimée');
      } catch (err) {
        showNotification('Erreur lors de la suppression', false);
      }
    }
  };

  const handleAddAbsence = async (data) => {
    try {
      const response = await absencesAPI.createAbsence(data);
      setAbsences([response.data, ...absences]);
      showNotification('✅ Absence enregistrée');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erreur';
      showNotification(errorMsg, false);
    }
  };

  const handleUpdateAbsence = async (id, data) => {
    try {
      const response = await absencesAPI.updateAbsence(id, data);
      setAbsences(absences.map(a => a._id === id ? response.data : a));
      showNotification('✅ Absence modifiée');
    } catch (err) {
      showNotification('Erreur', false);
    }
  };

  const handleDeleteAbsence = async (id) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        await absencesAPI.deleteAbsence(id);
        setAbsences(absences.filter(a => a._id !== id));
        showNotification('✅ Absence supprimée');
      } catch (err) {
        showNotification('Erreur', false);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Espace Professeur</h1>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-gray-600">
                  <span className="text-gray-500">Connecté:</span> <span className="font-semibold text-blue-600">{user?.email}</span>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold">
                  📚 {user?.subject}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Notifications */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-md animate-pulse">
            <p className="font-bold mb-1">Erreur</p>
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg shadow-md">
            <p className="font-bold mb-1">Succès</p>
            <p>{success}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition">
            <p className="text-blue-100 text-sm font-semibold mb-2">Total Notes</p>
            <p className="text-5xl font-bold">{notes.length}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition">
            <p className="text-orange-100 text-sm font-semibold mb-2">Total Absences</p>
            <p className="text-5xl font-bold">{absences.length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition">
            <p className="text-purple-100 text-sm font-semibold mb-2">Votre Matière</p>
            <p className="text-3xl font-bold">{user?.subject}</p>
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
              <span className="text-xl">📊</span> Gestion des Notes
            </button>
            <button
              onClick={() => setActiveTab('absences')}
              className={`flex-1 py-5 px-6 font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'absences'
                  ? 'bg-orange-500 text-white border-b-4 border-orange-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">❌</span> Gestion des Absences
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'notes' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Ajouter une Note</h3>
                  <FormAddNote 
                    userSubject={user?.subject} 
                    onSubmit={handleAddNote}
                  />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Liste des Notes</h3>
                  <TableNotes
                    notes={notes}
                    onUpdate={handleUpdateNote}
                    onDelete={handleDeleteNote}
                    isProf={true}
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'absences' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Enregistrer une Absence</h3>
                  <FormAddAbsence 
                    userSubject={user?.subject} 
                    onSubmit={handleAddAbsence}
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Liste des Absences</h3>
                  <TableAbsences
                    absences={absences}
                    onUpdate={handleUpdateAbsence}
                    onDelete={handleDeleteAbsence}
                    isProf={true}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}