import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse, faBuilding, faUsers,
  faBell, faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { C, FONT, ASESOR } from "../../styles/tokens";
import { AuthContext } from "../../context/AuthContext";

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
    { path: "/asesor",          icon: faHouse,    label: "Inicio"        },
    { path: "/asesor/empresas", icon: faBuilding, label: "Mis Empresas"  },
    { path: "/asesor/clientes", icon: faUsers,    label: "Mis Clientes"  },
  ];

  const isActive = (path) =>
    path === "/asesor"
      ? location.pathname === "/asesor" || location.pathname === "/asesor/"
      : location.pathname.startsWith(path);

  return (
    <div style={{
      width: 64, background: C.black, height: "100vh",
      position: "fixed", left: 0, top: 0,
      display: "flex", flexDirection: "column", alignItems: "center",
      paddingBottom: 20, zIndex: 200,
      borderRight: `1px solid ${C.gray800}`,
    }}>
      {/* Logo */}
      <div style={{
        width: 64, height: 56,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: `1px solid ${C.gray800}`,
      }}>
        <div style={{
          width: 28, height: 28, background: C.red, borderRadius: 4,
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
            <FontAwesomeIcon icon={item.icon} style={{ fontSize: 18 }} />
          </SidebarBtn>
        ))}
      </div>

      {/* Notificaciones + Avatar + Logout */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        {/* Campana */}
        <div style={{ position: "relative", cursor: "pointer", color: C.gray500 }}>
          <FontAwesomeIcon icon={faBell} style={{ fontSize: 18 }} />
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

        {/* Avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: C.gray700, border: `2px solid ${C.gray500}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <span style={{ color: C.white, fontFamily: FONT, fontWeight: 700, fontSize: 12 }}>{initials}</span>
        </div>

        {/* Cerrar sesión */}
        <button
          title="Cerrar sesión"
          onClick={() => { logout(); navigate("/"); }}
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
          <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: 16 }} />
        </button>
      </div>
    </div>
  );
}