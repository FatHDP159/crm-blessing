import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { C, FONT, ASESOR } from "../../styles/tokens";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function IconHome() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </svg>
  );
}
function IconPeople() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
}
function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={C.gray300} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}
function IconLogout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

function SidebarBtn({ active, onClick, children, label }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={label}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", height: 48,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: active ? C.red : hov ? C.gray800 : "transparent",
        border: "none", cursor: "pointer",
        borderLeft: active ? `3px solid ${C.white}` : "3px solid transparent",
        transition: "all 0.15s",
      }}
    >
      <span style={{ color: active ? C.white : hov ? C.white : C.gray500, transition: "color 0.15s" }}>
        {children}
      </span>
    </button>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const initials = ASESOR.nombre[0] + ASESOR.apellido[0];
  const [hovLogout, setHovLogout] = useState(false);

  const navItems = [
    { path: "/asesor",          icon: <IconHome />,     label: "Inicio" },
    { path: "/asesor/empresas", icon: <IconBuilding />, label: "Mis Empresas" },
    { path: "/asesor/clientes", icon: <IconPeople />,   label: "Mis Clientes" },
  ];

  const isActive = (path) =>
    path === "/asesor"
      ? location.pathname === "/asesor" || location.pathname === "/asesor/"
      : location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{
      width: 64,
      background: C.black,
      height: "100vh",
      position: "fixed",
      left: 0, top: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: 20,
      zIndex: 200,
      borderRight: `1px solid ${C.gray800}`,
    }}>
      {/* Logo */}
      <div style={{
        width: 64, height: 56,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: `1px solid ${C.gray800}`,
      }}>
        <div style={{
          width: 28, height: 28,
          background: C.red, borderRadius: 4,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: C.white, fontFamily: FONT, fontWeight: 900, fontSize: 13 }}>B</span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, paddingTop: 12, width: "100%" }}>
        {navItems.map(item => (
          <SidebarBtn
            key={item.path}
            active={isActive(item.path)}
            label={item.label}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
          </SidebarBtn>
        ))}
      </div>

      {/* Notificaciones + Avatar + Logout */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <IconBell />
          {ASESOR.notificaciones > 0 && (
            <span style={{
              position: "absolute", top: -6, right: -8,
              background: C.red, color: C.white,
              borderRadius: 10, padding: "1px 5px",
              fontSize: 10, fontWeight: 700, fontFamily: FONT,
            }}>
              {ASESOR.notificaciones}
            </span>
          )}
        </div>

        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: C.gray700, border: `2px solid ${C.gray500}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <span style={{ color: C.white, fontFamily: FONT, fontWeight: 700, fontSize: 12 }}>{initials}</span>
        </div>

        {/* Botón cerrar sesión */}
        <button
          title="Cerrar sesión"
          onClick={handleLogout}
          onMouseEnter={() => setHovLogout(true)}
          onMouseLeave={() => setHovLogout(false)}
          style={{
            width: 34, height: 34, borderRadius: 6,
            background: hovLogout ? C.red : C.gray800,
            border: `1px solid ${hovLogout ? C.red : C.gray700}`,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
            color: hovLogout ? C.white : C.gray500,
          }}
        >
          <IconLogout />
        </button>
      </div>
    </div>
  );
}