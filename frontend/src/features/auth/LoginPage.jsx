import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 importante
import api from "../../services/apiClient";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // 🔹 hook de navegación

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // evita recargar la página

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);       // guarda el user en contexto
      navigate("/asesor");   // 🔹 redirige al dashboard
    } catch (err) {
      console.error(err);    // ayuda a depurar
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
          value={email}                  // 🔹 bind del estado
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}               // 🔹 bind del estado
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}