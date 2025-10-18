// backend/seeds/seedDB.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Student, Note, Absence } from '../config/db.js';

dotenv.config();

const seedDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/school_db';
    await mongoose.connect(uri);
    console.log('✅ Connecté à MongoDB');

    // Clear collections
    await User.deleteMany({});
    await Student.deleteMany({});
    await Note.deleteMany({});
    await Absence.deleteMany({});

    // Create Users
    const users = [
      { email: 'parent1@gmail.com', password: 'parent1@123', role: 'parent', childId: 1 },
      { email: 'parent2@gmail.com', password: 'parent2@123', role: 'parent', childId: 2 },
      { email: 'parent3@gmail.com', password: 'parent3@123', role: 'parent', childId: 3 },
      { email: 'prof1@gmail.com', password: 'prof1@123', role: 'prof' },
      { email: 'prof2@gmail.com', password: 'prof2@123', role: 'prof' },
      { email: 'prof3@gmail.com', password: 'prof3@123', role: 'prof' }
    ];
    await User.insertMany(users);
    console.log('✅ Users créés');

    // Create Students
    const students = [
      { studentId: 1, name: 'Ahmed Kouali', className: '3ème A' },
      { studentId: 2, name: 'Fatima Bennani', className: '3ème B' },
      { studentId: 3, name: 'Karim El-Amrani', className: '3ème A' }
    ];
    await Student.insertMany(students);
    console.log('✅ Students créés');

    // Create Notes
    const notes = [
      // Student 1
      { studentId: 1, subject: 'Mathématiques', cc: 14, exam: 12, average: 13 },
      { studentId: 1, subject: 'Français', cc: 16, exam: 15, average: 15.5 },
      { studentId: 1, subject: 'Anglais', cc: 12, exam: 11, average: 11.5 },
      { studentId: 1, subject: 'Sciences', cc: 15, exam: 14, average: 14.5 },
      // Student 2
      { studentId: 2, subject: 'Mathématiques', cc: 18, exam: 17, average: 17.5 },
      { studentId: 2, subject: 'Français', cc: 17, exam: 16, average: 16.5 },
      { studentId: 2, subject: 'Anglais', cc: 15, exam: 14, average: 14.5 },
      { studentId: 2, subject: 'Sciences', cc: 16, exam: 15, average: 15.5 },
      // Student 3
      { studentId: 3, subject: 'Mathématiques', cc: 11, exam: 10, average: 10.5 },
      { studentId: 3, subject: 'Français', cc: 13, exam: 12, average: 12.5 },
      { studentId: 3, subject: 'Anglais', cc: 10, exam: 9, average: 9.5 },
      { studentId: 3, subject: 'Sciences', cc: 12, exam: 11, average: 11.5 }
    ];
    await Note.insertMany(notes);
    console.log('✅ Notes créées');

    // Create Absences
    const absences = [
      { studentId: 1, subject: 'Mathématiques', date: new Date('2024-10-10'), status: 'absent' },
      { studentId: 1, subject: 'Français', date: new Date('2024-10-12'), status: 'justified' },
      { studentId: 2, subject: 'Anglais', date: new Date('2024-10-08'), status: 'absent' },
      { studentId: 3, subject: 'Sciences', date: new Date('2024-10-15'), status: 'absent' },
      { studentId: 3, subject: 'Mathématiques', date: new Date('2024-10-11'), status: 'justified' }
    ];
    await Absence.insertMany(absences);
    console.log('✅ Absences créées');

    console.log('🎉 Base de données seedée avec succès!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

seedDB();