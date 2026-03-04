import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginPage from './features/auth/LoginPage';
import EmpresasPage from './features/empresas/EmpresasPage';

function AppContent() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <LoginPage />;

  return (
    <div>
      <button onClick={logout}>Cerrar sesión</button>

      {user.role === "asesor" && <h1>Bienvenido Asesor</h1>}

      {user.role === "supervisor" && <EmpresasPage />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}