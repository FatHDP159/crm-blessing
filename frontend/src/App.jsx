import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoginPage       from "./features/auth/LoginPage";
import AsesorLayout    from "./layouts/AsesorLayout";
import AsesorPage      from "./features/asesor/AsesorPage";
import SupervisorLayout from "./layouts/SupervisorLayout";
import SupervisorPage  from "./features/supervisor/SupervisorPage";

export default function App() {
  const { user } = useContext(AuthContext);

  if (!user) return <LoginPage />;

  return (
    <Routes>
      {user.role === "asesor" && (
        <Route path="/asesor/*" element={<AsesorLayout />}>
          <Route path="*" element={<AsesorPage />} />
        </Route>
      )}
      {user.role === "supervisor" && (
        <Route path="/supervisor/*" element={<SupervisorLayout />}>
          <Route path="*" element={<SupervisorPage />} />
        </Route>
      )}
      <Route path="*" element={
        <Navigate to={user.role === "supervisor" ? "/supervisor" : "/asesor"} replace />
      } />
    </Routes>
  );
}