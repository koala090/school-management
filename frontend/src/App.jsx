// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import DashboardParent from './pages/DashboardParent';
import DashboardProf from './pages/DashboardProf';
import ForgotPassword from './pages/ForgotPassword';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard/parent" 
            element={<ProtectedRoute><DashboardParent /></ProtectedRoute>} 
          />
          <Route 
            path="/dashboard/prof" 
            element={<ProtectedRoute><DashboardProf /></ProtectedRoute>} 
          />
          <Route 
            path="/forgot-password" 
            element={<ForgotPassword />} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;