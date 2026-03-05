import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Legend,
} from "recharts";
import { C, S, FONT, ASESOR } from "../../../styles/tokens";
import { PageHeader } from "../../../components/ui/SharedUI";

const ETAPAS_DATA = [
  { etapa: "Identificada", cantidad: 14 },
  { etapa: "Propuesta",    cantidad: 9  },
  { etapa: "Negociación",  cantidad: 6  },
  { etapa: "Aprobada",     cantidad: 4  },
  { etapa: "Rechazada",    cantidad: 3  },
];

const CERRADAS_DATA = [
  { etapa: "Aprobada",  cantidad: 4 },
  { etapa: "Rechazada", cantidad: 3 },
];

const CITAS_DATA = [
  { mes: "Ene", citas: 8,  tipif: 12 },
  { mes: "Feb", citas: 11, tipif: 9  },
  { mes: "Mar", citas: 7,  tipif: 14 },
  { mes: "Abr", citas: 13, tipif: 8  },
  { mes: "May", citas: 6,  tipif: 11 },
  { mes: "Jun", citas: 15, tipif: 17 },
];

const METRICAS = [
  { label: "Clientes",         value: "47",         icon: "👥" },
  { label: "Oportunidades",    value: "93",          icon: "🎯" },
  { label: "Ganadas",          value: "36",          icon: "✅" },
  { label: "CF Total Ganadas", value: "S/ 284,000",  icon: "💰" },
  { label: "CF Móvil",         value: "S/ 98,000",   icon: "📱" },
  { label: "CF Fibra",         value: "S/ 67,000",   icon: "🌐" },
  { label: "CF Fija",          value: "S/ 54,000",   icon: "📞" },
  { label: "CF Cloud",         value: "S/ 65,000",   icon: "☁️" },
];

const GRAF_OPTIONS = [
  { key: "etapas",   label: "Op. por Etapa"         },
  { key: "cerradas", label: "Op. Etapa Cerrada"      },
  { key: "citas",    label: "Citas y Tipificaciones" },
];

function ChartCard({ title, children }) {
  return (
    <div style={{ ...S.card, padding: "16px 20px" }}>
      <div style={{ ...S.text(12, 700, C.gray500), marginBottom: 12, letterSpacing: "0.06em" }}>
        {title.toUpperCase()}
      </div>
      {children}
    </div>
  );
}

export default function Principal() {
  const [desde, setDesde]         = useState("2024-01-01");
  const [hasta, setHasta]         = useState("2024-12-31");
  const [grafSelec, setGrafSelec] = useState(["etapas", "citas"]);

  const toggleGraf = (key) =>
    setGrafSelec(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Bienvenido, ${ASESOR.nombre} ${ASESOR.apellido}`}
      />

      {/* Filtro período */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        marginBottom: 24, background: C.white,
        padding: "12px 16px", borderRadius: 6,
        border: `1px solid ${C.border}`, width: "fit-content",
      }}>
        <span style={S.text(12, 700, C.gray500)}>PERÍODO:</span>
        <input type="date" value={desde} onChange={e => setDesde(e.target.value)}
          style={S.input}
          onFocus={e => e.target.style.borderColor = C.red}
          onBlur={e => e.target.style.borderColor = C.border}
        />
        <span style={S.text(12, 400, C.gray500)}>—</span>
        <input type="date" value={hasta} onChange={e => setHasta(e.target.value)}
          style={S.input}
          onFocus={e => e.target.style.borderColor = C.red}
          onBlur={e => e.target.style.borderColor = C.border}
        />
      </div>

      {/* Métricas */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))",
        gap: 12, marginBottom: 28,
      }}>
        {METRICAS.map((m, i) => (
          <div key={i} style={{ ...S.card, padding: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: 12, top: 12, fontSize: 20, opacity: 0.15 }}>
              {m.icon}
            </div>
            <div style={S.text(11, 700, C.gray500)}>{m.label.toUpperCase()}</div>
            <div style={{ ...S.text(22, 800, C.black), marginTop: 4 }}>{m.value}</div>
            {i === 0 && (
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "40%", height: 3, background: C.red }} />
            )}
          </div>
        ))}
      </div>

      {/* Selector gráficos */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ ...S.text(12, 700, C.gray500), marginRight: 4 }}>MOSTRAR:</span>
        {GRAF_OPTIONS.map(o => (
          <button key={o.key} onClick={() => toggleGraf(o.key)}
            style={{ ...S.btn(grafSelec.includes(o.key) ? "primary" : "secondary"), fontSize: 11 }}
            onMouseEnter={e => {
              if (!grafSelec.includes(o.key))
                e.currentTarget.style.borderColor = C.red;
            }}
            onMouseLeave={e => {
              if (!grafSelec.includes(o.key))
                e.currentTarget.style.borderColor = C.border;
            }}
          >
            {grafSelec.includes(o.key) ? "✓ " : ""}{o.label}
          </button>
        ))}
      </div>

      {/* Gráficos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px,1fr))", gap: 16 }}>
        {grafSelec.includes("etapas") && (
          <ChartCard title="Oportunidades por Etapa">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ETAPAS_DATA} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="etapa" tick={{ fontFamily: FONT, fontSize: 11, fill: C.gray500 }} />
                <YAxis tick={{ fontFamily: FONT, fontSize: 11, fill: C.gray500 }} />
                <Tooltip contentStyle={{ fontFamily: FONT, fontSize: 12, border: `1px solid ${C.border}`, borderRadius: 4 }} />
                <Bar dataKey="cantidad" radius={[3, 3, 0, 0]}>
                  {ETAPAS_DATA.map((_, i) => <Cell key={i} fill={i === 0 ? C.red : C.gray800} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {grafSelec.includes("cerradas") && (
          <ChartCard title="Oportunidades Cerradas">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={CERRADAS_DATA} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="etapa" tick={{ fontFamily: FONT, fontSize: 11, fill: C.gray500 }} />
                <YAxis tick={{ fontFamily: FONT, fontSize: 11, fill: C.gray500 }} />
                <Tooltip contentStyle={{ fontFamily: FONT, fontSize: 12, border: `1px solid ${C.border}`, borderRadius: 4 }} />
                <Bar dataKey="cantidad" radius={[3, 3, 0, 0]}>
                  {CERRADAS_DATA.map((_, i) => <Cell key={i} fill={i === 0 ? "#2E7D32" : C.red} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {grafSelec.includes("citas") && (
          <ChartCard title="Citas y Tipificaciones por Mes">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={CITAS_DATA} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="mes" tick={{ fontFamily: FONT, fontSize: 11, fill: C.gray500 }} />
                <YAxis tick={{ fontFamily: FONT, fontSize: 11, fill: C.gray500 }} />
                <Tooltip contentStyle={{ fontFamily: FONT, fontSize: 12, border: `1px solid ${C.border}`, borderRadius: 4 }} />
                <Legend wrapperStyle={{ fontFamily: FONT, fontSize: 11 }} />
                <Bar dataKey="citas"  name="Citas"          fill={C.black} radius={[3, 3, 0, 0]} />
                <Bar dataKey="tipif"  name="Tipificaciones" fill={C.red}   radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}
      </div>
    </div>
  );
}