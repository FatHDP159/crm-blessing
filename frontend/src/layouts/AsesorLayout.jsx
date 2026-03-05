import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/asesor/Sidebar";
import { C, FONT } from "../styles/tokens";

export default function AsesorLayout() {
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
        marginLeft: 64,
        padding: "32px 36px",
        minHeight: "100vh",
        maxWidth: 1360,
        animation: "fadeSlide 0.25s ease",
      }}>
        <Outlet />
      </main>
    </div>
  );
}