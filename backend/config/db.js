// backend/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/school_db';
    await mongoose.connect(uri);
    console.log('✅ MongoDB connecté avec succès');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;

// Schémas Mongoose

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['parent', 'prof', 'admin'], default: 'parent' },
  childId: { type: Number, default: null }
});

const studentSchema = new mongoose.Schema({
  studentId: { type: Number, required: true, unique: true },
  name: String,
  className: String
});

const noteSchema = new mongoose.Schema({
  studentId: { type: Number, required: true },
  subject: String,
  cc: Number,
  exam: Number,
  average: Number,
  createdAt: { type: Date, default: Date.now }
});

const absenceSchema = new mongoose.Schema({
  studentId: { type: Number, required: true },
  subject: String,
  date: Date,
  status: { type: String, enum: ['absent', 'present', 'justified'], default: 'absent' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
export const Student = mongoose.model('Student', studentSchema);
export const Note = mongoose.model('Note', noteSchema);
export const Absence = mongoose.model('Absence', absenceSchema);