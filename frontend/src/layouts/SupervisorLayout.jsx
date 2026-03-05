import React, { useState, useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie, faBuilding, faUserTie,
  faFileLines, faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { C, FONT } from "../styles/tokens";

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

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [hovLogout, setHovLogout] = useState(false);

  const navItems = [
    { path: "/supervisor",          icon: faChartPie,  label: "Dashboard" },
    { path: "/supervisor/asesores", icon: faUserTie,   label: "Asesores"  },
    { path: "/supervisor/empresas", icon: faBuilding,  label: "Empresas"  },
    { path: "/supervisor/reportes", icon: faFileLines, label: "Reportes"  },
  ];

  const isActive = (path) =>
    path === "/supervisor"
      ? location.pathname === "/supervisor" || location.pathname === "/supervisor/"
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
          <span style={{ color: C.white, fontFamily: FONT, fontWeight: 900, fontSize: 13 }}>S</span>
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

      {/* Avatar + Logout */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: C.red, border: `2px solid ${C.gray500}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <span style={{ color: C.white, fontFamily: FONT, fontWeight: 700, fontSize: 12 }}>SP</span>
        </div>

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

export default function SupervisorLayout() {
  return (
    <div style={{ fontFamily: FONT, background: C.gray100, minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input, select, textarea, button { font-family: 'Arial', 'Helvetica Neue', sans-serif; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F5F5F5; }
        ::-webkit-scrollbar-thumb { background: #C4C4C4; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #D32F2F; }
      `}</style>

      <Sidebar />

      <main style={{
        marginLeft: 64, padding: "32px 36px",
        minHeight: "100vh", maxWidth: 1360,
        animation: "fadeSlide 0.25s ease",
      }}>
        <Outlet />
      </main>
    </div>
  );
}