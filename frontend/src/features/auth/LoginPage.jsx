import React, { useState, useContext } from 'react';
import api from '../../services/apiClient';
import { AuthContext } from '../../context/AuthContext';
import './login.css';

export default function LoginPage() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault(); // evita que recargue la página

  try {
    const res = await api.post('/auth/login', { email, password });
    login(res.data);
  } catch (err) {
    alert("Credenciales incorrectas");
  }
};

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Bienvenido!</h1>
        <p>Inicia sesión para continuar</p>

        <input
          type="email"
          placeholder="Correo electrónico"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}