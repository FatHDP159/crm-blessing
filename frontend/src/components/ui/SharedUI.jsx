import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdCard, faPhone, faEnvelope, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { C, S, FONT } from "../../styles/tokens";

// ── PageHeader ─────────────────────────────────────────────────
export function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 24, borderBottom: `2px solid ${C.red}`, paddingBottom: 12 }}>
      <h1 style={{ ...S.text(22, 800, C.black), margin: 0, letterSpacing: "-0.01em" }}>{title}</h1>
      {subtitle && <p style={{ ...S.text(13, 400, C.gray500), margin: "4px 0 0" }}>{subtitle}</p>}
    </div>
  );
}

// ── Overlay + ModalBox ─────────────────────────────────────────
export function Overlay({ onClose, children }) {
  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      {children}
    </div>
  );
}

export function ModalBox({ title, sub, onClose, children, wide }) {
  return (
    <div style={{
      background: C.white,
      borderRadius: 6,
      width: "100%",
      maxWidth: wide ? 660 : 460,
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      overflow: "hidden",
      animation: "fadeSlide 0.2s ease",
      maxHeight: "92vh",
      overflowY: "auto",
    }}>
      <div style={{
        padding: "16px 20px",
        borderBottom: `3px solid ${C.red}`,
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div>
          <div style={S.text(16, 800, C.black)}>{title}</div>
          {sub && <div style={S.text(12, 400, C.gray500)}>{sub}</div>}
        </div>
        <button
          onClick={onClose}
          onMouseEnter={e => e.currentTarget.style.color = C.red}
          onMouseLeave={e => e.currentTarget.style.color = C.gray500}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 20, color: C.gray500, lineHeight: 1, marginTop: -2,
            transition: "color 0.15s",
          }}
        >×</button>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

// ── ContactoCarrusel ───────────────────────────────────────────
export function ContactoCarrusel({ contactos }) {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState(0);

  const navigate = (newDir) => {
    if (animating || !contactos || contactos.length <= 1) return;
    setDir(newDir);
    setAnimating(true);
    setTimeout(() => {
      setIdx(i => (i + newDir + contactos.length) % contactos.length);
      setAnimating(false);
    }, 200);
  };

  if (!contactos || contactos.length === 0) {
    return (
      <div style={{ ...S.text(12, 400, C.gray300), textAlign: "center", padding: "8px 0" }}>
        Sin contactos registrados
      </div>
    );
  }

  const c = contactos[idx];

  const campos = [
    { icon: faUser,     valor: c.nombre },
    { icon: faIdCard,   valor: c.dni    },
    { icon: faPhone,    valor: c.tel    },
    { icon: faEnvelope, valor: c.email  },
  ];

  return (
    <div style={{ position: "relative", minHeight: 80 }}>
      <div style={{
        opacity: animating ? 0 : 1,
        transform: animating ? `translateX(${dir * 12}px)` : "translateX(0)",
        transition: "all 0.2s ease",
      }}>
        {/* Grid 2 columnas de campos */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px 12px",
          marginBottom: 8,
        }}>
          {campos.map(({ icon, valor }, i) => (
            <div key={i} style={{
              display: "flex", gap: 7, alignItems: "center",
              overflow: "hidden",
            }}>
              <FontAwesomeIcon
                icon={icon}
                style={{ fontSize: 12, color: C.red, minWidth: 14, flexShrink: 0 }}
              />
              <span style={{
                fontFamily: FONT, fontSize: 12, color: C.gray700,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{valor}</span>
            </div>
          ))}
        </div>

        {/* Cargo en fila completa */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <FontAwesomeIcon
            icon={faBriefcase}
            style={{ fontSize: 12, color: C.red, minWidth: 14, flexShrink: 0 }}
          />
          <span style={{
            fontFamily: FONT, fontSize: 12, color: C.gray500,
          }}>
            <span style={{ fontWeight: 700, color: C.gray700 }}>Cargo: </span>{c.cargo}
          </span>
        </div>
      </div>

      {/* Navegación dots */}
      {contactos.length > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10 }}>
          <NavDot onClick={() => navigate(-1)}>‹</NavDot>
          {contactos.map((_, i) => (
            <div
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 14 : 7, height: 7,
                borderRadius: 4,
                background: i === idx ? C.red : C.gray300,
                cursor: "pointer", transition: "all 0.2s",
              }}
            />
          ))}
          <NavDot onClick={() => navigate(1)}>›</NavDot>
        </div>
      )}
    </div>
  );
}

function NavDot({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 22, height: 22, borderRadius: "50%",
        background: hov ? C.black : C.gray100,
        border: `1px solid ${C.border}`,
        cursor: "pointer", fontSize: 12,
        color: hov ? C.white : C.gray700,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
      }}
    >{children}</button>
  );
}