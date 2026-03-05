import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./features/auth/LoginPage";
import AsesorLayout from "./layouts/AsesorLayout";
import AsesorPage from "./features/asesor/AsesorPage";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Ruta pública de login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Ruta privada: solo asesores logueados */}
      {user && user.role === "asesor" && (
        <Route path="/asesor/*" element={<AsesorLayout />}>
          <Route path="*" element={<AsesorPage />} />
        </Route>
      )}

      {/* Redirección por defecto según usuario */}
      <Route
        path="*"
        element={<Navigate to={user ? "/asesor" : "/login"} replace />}
      />
    </Routes>
  );
} 