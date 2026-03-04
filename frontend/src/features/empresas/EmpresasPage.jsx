
import React, { useEffect, useState } from 'react';
import api from '../../services/apiClient';

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    api.get('/empresas').then(res => setEmpresas(res.data));
  }, []);

  return (
    <div>
      <h1>Empresas</h1>
      <ul>
        {empresas.map(emp => (
          <li key={emp.id}>{emp.nombre} - {emp.ruc}</li>
        ))}
      </ul>
    </div>
  );
}
