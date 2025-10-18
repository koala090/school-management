// frontend/src/components/TableNotes.jsx
import { useState } from 'react';

export default function TableNotes({ notes, onAdd, onUpdate, onDelete, isProf = false }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    cc: '',
    exam: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, {
        cc: parseInt(formData.cc),
        exam: parseInt(formData.exam)
      });
      setEditingId(null);
    } else {
      onAdd({
        studentId: parseInt(formData.studentId),
        subject: formData.subject,
        cc: parseInt(formData.cc),
        exam: parseInt(formData.exam)
      });
    }
    setFormData({ studentId: '', subject: '', cc: '', exam: '' });
    setShowForm(false);
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setFormData({
      studentId: note.studentId,
      subject: note.subject,
      cc: note.cc,
      exam: note.exam
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ studentId: '', subject: '', cc: '', exam: '' });
  };

  const groupedNotes = {};
  notes.forEach(note => {
    if (!groupedNotes[note.subject]) {
      groupedNotes[note.subject] = [];
    }
    groupedNotes[note.subject].push(note);
  });

  return (
    <div className="space-y-6">
      {isProf && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
        >
          {showForm ? '❌ Annuler' : '➕ Ajouter une note'}
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
              type="number"
              name="cc"
              placeholder="CC (0-20)"
              value={formData.cc}
              onChange={handleInputChange}
              min="0" max="20"
              className="px-3 py-2 border rounded focus:outline-none"
              required
            />
            <input
              type="number"
              name="exam"
              placeholder="Examen (0-20)"
              value={formData.exam}
              onChange={handleInputChange}
              min="0" max="20"
              className="px-3 py-2 border rounded focus:outline-none"
              required
            />
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

      {Object.keys(groupedNotes).length > 0 ? (
        Object.entries(groupedNotes).map(([subject, subjectNotes]) => (
          <div key={subject}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">📖 {subject}</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  {isProf && <th className="border p-2">ID Étudiant</th>}
                  <th className="border p-2">CC</th>
                  <th className="border p-2">Examen</th>
                  <th className="border p-2">Moyenne</th>
                  {isProf && <th className="border p-2">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {subjectNotes.map(note => (
                  <tr key={note._id} className="hover:bg-gray-100">
                    {isProf && <td className="border p-2">{note.studentId}</td>}
                    <td className="border p-2 text-center">{note.cc}</td>
                    <td className="border p-2 text-center">{note.exam}</td>
                    <td className="border p-2 text-center font-bold">{note.average.toFixed(2)}</td>
                    {isProf && (
                      <td className="border p-2 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(note)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => onDelete(note._id)}
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
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center py-4">Aucune note disponible</p>
      )}
    </div>
  );
}