import React from "react";
import { Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import Empresas  from "./pages/Empresas";
import Clientes  from "./pages/Clientes";

export default function AsesorPage() {
  return (
    <Routes>
      <Route index             element={<Principal />} />
      <Route path="empresas"   element={<Empresas />}  />
      <Route path="clientes"   element={<Clientes />}  />
    </Routes>
  );
}