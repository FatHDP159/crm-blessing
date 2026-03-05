import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard     from "./pages/Dashboard";
import Asesores      from "./pages/Asesores";
import EmpresasGlobal from "./pages/EmpresasGlobal";
import Reportes      from "./pages/Reportes";

export default function SupervisorPage() {
  return (
    <Routes>
      <Route index                element={<Dashboard />}      />
      <Route path="asesores"      element={<Asesores />}       />
      <Route path="empresas"      element={<EmpresasGlobal />} />
      <Route path="reportes"      element={<Reportes />}       />
    </Routes>
  );
}