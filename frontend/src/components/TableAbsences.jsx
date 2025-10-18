// frontend/src/components/TableAbsences.jsx
import { useState } from 'react';

export default function TableAbsences({ absences, onAdd, onUpdate, onDelete, isProf = false }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    date: '',
    status: 'absent'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, { status: formData.status });
      setEditingId(null);
    } else {
      onAdd({
        studentId: parseInt(formData.studentId),
        subject: formData.subject,
        date: formData.date,
        status: formData.status
      });
    }
    setFormData({ studentId: '', subject: '', date: '', status: 'absent' });
    setShowForm(false);
  };

  const handleEdit = (absence) => {
    setEditingId(absence._id);
    setFormData({
      studentId: absence.studentId,
      subject: absence.subject,
      date: absence.date.split('T')[0],
      status: absence.status
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ studentId: '', subject: '', date: '', status: 'absent' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'absent': return 'bg-red-100 text-red-800';
      case 'present': return 'bg-green-100 text-green-800';
      case 'justified': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'absent': return '❌ Absent';
      case 'present': return '✅ Présent';
      case 'justified': return '⚠️ Justifié';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {isProf && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
        >
          {showForm ? '❌ Annuler' : '➕ Marquer une absence'}
        </button>
      )}

      {showForm && isProf && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="studentId"
              placeholder="ID Étudiant"
              value={formData.studentId}
              onChange={handleInputChange}
              disabled={editingId !== null}
              className="px-3 py-2 border rounded focus:outline-none"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Matière"
              value={formData.subject}
              onChange={handleInputChange}
              disabled={editingId !== null}
              className="px-3 py-2 border rounded focus:outline-none"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              disabled={editingId !== null}
              className="px-3 py-2 border rounded focus:outline-none col-span-2"
              required
            />
            {editingId && (
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded focus:outline-none col-span-2"
              >
                <option value="absent">❌ Absent</option>
                <option value="present">✅ Présent</option>
                <option value="justified">⚠️ Justifié</option>
              </select>
            )}
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              {editingId ? '✏️ Modifier' : '💾 Enregistrer'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Annuler édition
              </button>
            )}
          </div>
        </form>
      )}

      {absences.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              {isProf && <th className="border p-2">ID Étudiant</th>}
              <th className="border p-2">Matière</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Statut</th>
              {isProf && <th className="border p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {absences.map(absence => (
              <tr key={absence._id} className="hover:bg-gray-100">
                {isProf && <td className="border p-2">{absence.studentId}</td>}
                <td className="border p-2">{absence.subject}</td>
                <td className="border p-2">{new Date(absence.date).toLocaleDateString('fr-FR')}</td>
                <td className="border p-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(absence.status)}`}>
                    {getStatusLabel(absence.status)}
                  </span>
                </td>
                {isProf && (
                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(absence)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(absence._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      🗑️
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center py-4">Aucune absence enregistrée</p>
      )}
    </div>
  );
}