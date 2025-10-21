// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// export default function WeeklySchedule({ absences }) {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [weekDays, setWeekDays] = useState([]);
  
//   const subjects = ['Français', 'Mathématiques', 'Sciences', 'Management de projet'];

//   useEffect(() => {
//     generateWeekDays();
//   }, [currentDate]);

//   const generateWeekDays = () => {
//     const today = new Date(currentDate);
//     const first = today.getDate() - today.getDay() + 1; // Lundi
    
//     const days = [];
//     for (let i = 0; i < 5; i++) { // Lundi à Vendredi
//       const date = new Date(today.getFullYear(), today.getMonth(), first + i);
//       days.push(date);
//     }
//     setWeekDays(days);
//   };

//   const getAbsenceStatus = (subject, date) => {
//     const absence = absences.find(abs => {
//       const absDate = new Date(abs.date);
//       return (
//         absDate.toDateString() === date.toDateString() &&
//         abs.subject === subject
//       );
//     });
//     return absence?.status || null;
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'absent':
//         return 'bg-red-200 border-red-400';
//       case 'justified':
//         return 'bg-yellow-200 border-yellow-400';
//       case 'present':
//         return 'bg-green-200 border-green-400';
//       default:
//         return 'bg-white border-gray-300';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'absent':
//         return '❌';
//       case 'justified':
//         return '⚠️';
//       case 'present':
//         return '✅';
//       default:
//         return '';
//     }
//   };

//   const getDayName = (date) => {
//     const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
//     return days[date.getDay()];
//   };

//   const previousWeek = () => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() - 7);
//     setCurrentDate(newDate);
//   };

//   const nextWeek = () => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() + 7);
//     setCurrentDate(newDate);
//   };

//   return (
//     <div className="w-full bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg shadow-lg p-6">
//       {/* Header avec navigation */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">📚 Calendrier Hebdomadaire</h2>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={previousWeek}
//             className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>
//           <span className="text-sm font-semibold text-gray-700 min-w-48 text-center">
//             Semaine du{' '}
//             {weekDays[0]?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
//           </span>
//           <button
//             onClick={nextWeek}
//             className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Tableau */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr>
//               <th className="bg-blue-400 text-white p-3 border-2 border-blue-500 text-left font-bold w-32">
//                 MATIÈRE
//               </th>
//               {weekDays.map((date, index) => (
//                 <th
//                   key={index}
//                   className="bg-pink-300 text-gray-800 p-3 border-2 border-pink-400 text-center font-bold"
//                 >
//                   <div>{getDayName(date)}</div>
//                   <div className="text-xs font-normal">
//                     {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {subjects.map((subject, subjectIndex) => (
//               <tr key={subjectIndex}>
//                 <td className="bg-blue-300 text-white p-3 border-2 border-blue-400 font-semibold">
//                   {subject}
//                 </td>
//                 {weekDays.map((date, dayIndex) => {
//                   const status = getAbsenceStatus(subject, date);
//                   const colorClass = getStatusColor(status);
//                   const icon = getStatusIcon(status);

//                   return (
//                     <td
//                       key={dayIndex}
//                       className={`p-4 border-2 h-24 cursor-pointer hover:shadow-md transition ${colorClass}`}
//                     >
//                       <div className="flex items-center justify-center h-full">
//                         <span className="text-3xl">{icon}</span>
//                       </div>
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Légende */}
//       <div className="mt-6 pt-4 border-t-2 border-pink-300">
//         <div className="flex flex-wrap gap-6 justify-center">
//           <div className="flex items-center gap-3">
//             <div className="w-6 h-6 bg-red-200 border-2 border-red-400 rounded flex items-center justify-center text-lg">❌</div>
//             <span className="text-sm font-semibold text-gray-700">Absent</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="w-6 h-6 bg-yellow-200 border-2 border-yellow-400 rounded flex items-center justify-center text-lg">⚠️</div>
//             <span className="text-sm font-semibold text-gray-700">Justifié</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="w-6 h-6 bg-green-200 border-2 border-green-400 rounded flex items-center justify-center text-lg">✅</div>
//             <span className="text-sm font-semibold text-gray-700">Présent</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
//             <span className="text-sm font-semibold text-gray-700">Pas de donnée</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function WeeklySchedule({ absences }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const subjects = ['Français', 'Mathématiques', 'Sciences', 'Management de projet'];
  
  // Emploi du temps avec horaires (exemple)
  const schedule = {
    'Français': { lundi: '8h-10h', mardi: '10h-12h', mercredi: '14h-16h', jeudi: '8h-10h', vendredi: '10h-12h' },
    'Mathématiques': { lundi: '10h-12h', mardi: '14h-16h', mercredi: '8h-10h', jeudi: '14h-16h', vendredi: '14h-16h' },
    'Sciences': { lundi: '14h-16h', mardi: '8h-10h', mercredi: '10h-12h', jeudi: '10h-12h', vendredi: '8h-10h' },
    'Management de projet': { lundi: '16h-18h', mardi: '12h-14h', mercredi: '16h-18h', jeudi: '12h-14h', vendredi: '12h-14h' }
  };

  const generateWeekDays = () => {
    const today = new Date(currentDate);
    const first = today.getDate() - today.getDay() + 1;
    
    const days = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), first + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = generateWeekDays();

  const getAbsenceStatus = (subject, date) => {
    const absence = absences.find(abs => {
      const absDate = new Date(abs.date);
      return (
        absDate.toDateString() === date.toDateString() &&
        abs.subject === subject
      );
    });
    return absence?.status || null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'absent':
        return 'bg-red-300 border-red-500';
      case 'justified':
        return 'bg-yellow-300 border-yellow-500';
      case 'present':
        return 'bg-green-300 border-green-500';
      default:
        return 'bg-yellow-100 border-yellow-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'absent':
        return '❌';
      case 'justified':
        return '⚠️';
      case 'present':
        return '✅';
      default:
        return '';
    }
  };

  const getDayName = (date) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    return days[date.getDay()];
  };

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="w-full bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg shadow-lg p-6">
      {/* Header avec navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📚 Emploi du Temps Hebdomadaire</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={previousWeek}
            className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition font-bold"
          >
            ◀
          </button>
          <span className="text-sm font-semibold text-gray-700 min-w-48 text-center">
            Semaine du{' '}
            {weekDays[0]?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={nextWeek}
            className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition font-bold"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-500 text-white p-3 border-2 border-blue-600 text-left font-bold w-40">
                MATIÈRE
              </th>
              {weekDays.map((date, index) => (
                <th
                  key={index}
                  className="bg-pink-400 text-white p-3 border-2 border-pink-500 text-center font-bold"
                >
                  <div className="text-sm">{getDayName(date)}</div>
                  <div className="text-xs font-normal">
                    {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, subjectIndex) => {
              const daysArray = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
              
              return (
                <tr key={subjectIndex}>
                  <td className="bg-blue-500 text-white p-3 border-2 border-blue-600 font-semibold">
                    {subject}
                  </td>
                  {weekDays.map((date, dayIndex) => {
                    const status = getAbsenceStatus(subject, date);
                    const colorClass = getStatusColor(status);
                    const icon = getStatusIcon(status);
                    const horaire = schedule[subject][daysArray[dayIndex]];

                    return (
                      <td
                        key={dayIndex}
                        className={`p-3 border-2 min-h-28 transition relative ${colorClass}`}
                      >
                        <div className="flex flex-col items-center justify-center h-full gap-2">
                          {/* Horaire */}
                          <div className="text-center">
                            <div className="font-bold text-gray-800 text-sm">{horaire}</div>
                          </div>
                          
                          {/* Statut absence */}
                          <div className="text-2xl">
                            {icon}
                          </div>
                          
                          {status && (
                            <div className="text-xs font-semibold text-gray-700">
                              {status === 'absent' && 'Absent'}
                              {status === 'justified' && 'Justifié'}
                              {status === 'present' && 'Présent'}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Légende */}
      <div className="mt-6 pt-4 border-t-2 border-pink-300">
        <h3 className="font-bold text-gray-800 mb-3">Légende:</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-yellow-100 border-2 border-yellow-300 rounded flex items-center justify-center text-sm">⏰</div>
            <span className="text-sm font-semibold text-gray-700">Horaire du cours</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-300 border-2 border-red-500 rounded flex items-center justify-center text-sm">❌</div>
            <span className="text-sm font-semibold text-gray-700">Absent</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-yellow-300 border-2 border-yellow-500 rounded flex items-center justify-center text-sm">⚠️</div>
            <span className="text-sm font-semibold text-gray-700">Justifié</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-300 border-2 border-green-500 rounded flex items-center justify-center text-sm">✅</div>
            <span className="text-sm font-semibold text-gray-700">Présent</span>
          </div>
        </div>
      </div>
    </div>
  );
}