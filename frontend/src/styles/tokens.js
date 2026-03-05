// ═══════════════════════════════════════════
// DESIGN TOKENS — Paleta Rojo / Negro / Blanco
// ═══════════════════════════════════════════
export const C = {
  red: "#D32F2F",
  redDark: "#B71C1C",
  redLight: "#FFEBEE",
  black: "#0A0A0A",
  gray900: "#111111",
  gray800: "#1C1C1C",
  gray700: "#2D2D2D",
  gray500: "#6B6B6B",
  gray300: "#C4C4C4",
  gray100: "#F5F5F5",
  white: "#FFFFFF",
  border: "#E8E8E8",
};

export const FONT = `'Arial', 'Helvetica Neue', sans-serif`;

export const S = {
  text: (sz = 13, wt = 400, col = C.gray800) => ({
    fontFamily: FONT,
    fontSize: sz,
    fontWeight: wt,
    color: col,
  }),
  btn: (variant = "primary") => ({
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: "8px 16px",
    borderRadius: 4,
    cursor: "pointer",
    border: variant === "primary" ? "none" : `1.5px solid ${C.border}`,
    background: variant === "primary" ? C.red : C.white,
    color: variant === "primary" ? C.white : C.gray700,
    transition: "all 0.15s",
  }),
  card: {
    background: "#FFFFFF",
    borderRadius: 6,
    border: "1px solid #E8E8E8",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  input: {
    fontFamily: FONT,
    fontSize: 13,
    padding: "8px 12px",
    borderRadius: 4,
    border: "1.5px solid #E8E8E8",
    outline: "none",
    background: "#FFFFFF",
    color: "#0A0A0A",
    transition: "border-color 0.15s",
  },
};

export const ESTADO_COLORS = {
  "Identificada":        { bg: "#EFEBE9", text: "#4E342E", border: "#BCAAA4" },
  "Propuesta Entregada": { bg: "#FFFDE7", text: "#F57F17", border: "#FFF176" },
  "Negociación":         { bg: "#E8F5E9", text: "#1B5E20", border: "#A5D6A7" },
  "Negociada Aprobada":  { bg: "#F1F8E9", text: "#33691E", border: "#C5E1A5" },
  "Negociada Rechazada": { bg: "#FFEBEE", text: "#B71C1C", border: "#FFCDD2" },
};

export const TIPIF_COLORS = {
  "Cliente Claro":       { bg: "#E3F2FD", text: "#0D47A1" },
  "Cliente interesado":  { bg: "#FFEBEE", text: "#B71C1C" },
  "Cliente con deuda":   { bg: "#FFF3E0", text: "#E65100" },
  "RUC sin contacto":    { bg: "#F5F5F5", text: "#424242" },
  "Cliente no contesta": { bg: "#F3E5F5", text: "#4A148C" },
};

export const TIPIFICACIONES = [
  "Cliente interesado",
  "Cliente Claro",
  "RUC sin contacto",
  "Cliente con deuda",
  "Cliente no contesta",
];

export const PRODUCTOS = [
  "Portabilidad", "Renovación", "Fibra", "HFC o FTTH",
  "Cloud", "Alta", "Licencias Google", "Licencias Microsoft", "SVA",
];

export const ASESOR = { nombre: "Ricardo", apellido: "Paredes", notificaciones: 7 };

export function diasEntre(d1, d2) {
  return Math.max(0, Math.round((new Date(d2) - new Date(d1)) / 86400000));
}

export function formatDate(d) {
  if (!d) return "—";
  const [y, m, dd] = d.split("-");
  return `${y.slice(2)}/${m}/${dd}`;
}