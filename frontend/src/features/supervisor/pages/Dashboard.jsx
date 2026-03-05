import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers, faBuilding, faBullseye,
  faTrophy, faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Legend,
} from "recharts";
import { C, S, FONT } from "../../../styles/tokens";
import { PageHeader } from "../../../components/ui/SharedUI";

const ASESORES_MOCK = [
  { nombre: "Ricardo Paredes",  empresas: 93,  tipificados: 47, oportunidades: 36, ganadas: 18, cf: 284000 },
  { nombre: "Lucía Fernández",  empresas: 78,  tipificados: 41, oportunidades: 29, ganadas: 14, cf: 198000 },
  { nombre: "Marco Quispe",     empresas: 105, tipificados: 55, oportunidades: 44, ganadas: 22, cf: 312000 },
  { nombre: "Daniela Torres",   empresas: 60,  tipificados: 30, oportunidades: 21, ganadas: 9,  cf: 145000 },
  { nombre: "Sergio Mamani",    empresas: 88,  tipificados: 43, oportunidades: 31, ganadas: 16, cf: 220000 },
];

const ETAPAS_DATA = [
  { etapa: "Identificada", cantidad: 58 },
  { etapa: "Propuesta",    cantidad: 41 },
  { etapa: "Negociación",  cantidad: 29 },
  { etapa: "Aprobada",     cantidad: 18 },
  { etapa: "Rechazada",    cantidad: 11 },
];

const METRICAS = [
  { label: "Total Asesores",      value: "5",            icon: faUsers         },
  { label: "Total Empresas",      value: "424",          icon: faBuilding      },
  { label: "Total Oportunidades", value: "161",          icon: faBullseye      },
  { label: "Total Ganadas",       value: "79",           icon: faTrophy        },
  { label: "CF Total Equipo",     value: "S/ 1,159,000", icon: faMoneyBillWave },
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

export default function Dashboard() {
  const [desde, setDesde]           = useState("2024-01-01");
  const [hasta, setHasta]           = useState("2024-12-31");
  const [asesorFiltro, setAsesorFiltro] = useState("Todos");

  return (
    <div>
      <PageHeader title="Dashboard Supervisor" subtitle="Vista general del equipo de ventas" />

      {/* Filtros */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: 24,
        background: C.white, padding: "12px 16px", borderRadius: 6,
        border: `1px solid ${C.border}`, flexWrap: "wrap",
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
        <span style={S.text(12, 700, C.gray500)}>ASESOR:</span>
        <select value={asesorFiltro} onChange={e => setAsesorFiltro(e.target.value)}
          style={{ ...S.input, appearance: "none" }}
          onFocus={e => e.target.style.borderColor = C.red}
          onBlur={e => e.target.style.borderColor = C.border}
        >
          <option>Todos</option>
          {ASESORES_MOCK.map(a => <option key={a.nombre}>{a.nombre}</option>)}
        </select>
      </div>

      {/* Métricas */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))",
        gap: 12, marginBottom: 28,
      }}>
        {METRICAS.map((m, i) => (
          <div key={i} style={{ ...S.card, padding: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: 12, top: 12, opacity: 0.12 }}>
              <FontAwesomeIcon icon={m.icon} style={{ fontSize: 28, color: C.black }} />
            </div>
            <div style={S.text(11, 700, C.gray500)}>{m.label.toUpperCase()}</div>
            <div style={{ ...S.text(22, 800, C.black), marginTop: 4 }}>{m.value}</div>
            {i === 0 && (
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "40%", height: 3, background: C.red }} />
            )}
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px,1fr))", gap: 16, marginBottom: 28 }}>
        <ChartCard title="Oportunidades por Etapa (Equipo)">
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

        <ChartCard title="Ranking de Asesores — Oportunidades Ganadas">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={[...ASESORES_MOCK].sort((a, b) => b.ganadas - a.ganadas)}
              margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis type="number" tick={{ fontFamily: FONT, fontSize: 11, fill: C.gray500 }} />
              <YAxis dataKey="nombre" type="category" width={120}
                tick={{ fontFamily: FONT, fontSize: 10, fill: C.gray500 }} />
              <Tooltip contentStyle={{ fontFamily: FONT, fontSize: 12, border: `1px solid ${C.border}`, borderRadius: 4 }} />
              <Bar dataKey="ganadas" name="Ganadas" radius={[0, 3, 3, 0]}>
                {ASESORES_MOCK.map((_, i) => <Cell key={i} fill={i === 0 ? C.red : C.gray800} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tabla ranking */}
      <div style={{ ...S.card, overflow: "hidden" }}>
        <div style={{
          padding: "12px 16px", borderBottom: `1px solid ${C.border}`,
          ...S.text(12, 700, C.gray500), letterSpacing: "0.06em",
        }}>
          RESUMEN POR ASESOR
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
          <thead>
            <tr style={{ background: C.black }}>
              {["#", "Asesor", "Empresas", "Tipificados", "Oportunidades", "Ganadas", "CF Total"].map(col => (
                <th key={col} style={{
                  padding: "10px 14px", textAlign: "left",
                  color: C.white, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                }}>{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...ASESORES_MOCK]
              .sort((a, b) => b.ganadas - a.ganadas)
              .map((a, i) => (
                <tr key={a.nombre}
                  style={{ background: i % 2 === 0 ? C.white : C.gray100, borderBottom: `1px solid ${C.border}`, transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FFEBEE"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.white : C.gray100}
                >
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      background: i === 0 ? C.red : C.gray700,
                      color: C.white, borderRadius: 3,
                      padding: "2px 8px", fontSize: 11, fontWeight: 700,
                    }}>#{i + 1}</span>
                  </td>
                  <td style={{ ...S.text(13, 700, C.black), padding: "10px 14px" }}>{a.nombre}</td>
                  <td style={{ ...S.text(13, 400, C.gray700), padding: "10px 14px" }}>{a.empresas}</td>
                  <td style={{ ...S.text(13, 400, C.gray700), padding: "10px 14px" }}>{a.tipificados}</td>
                  <td style={{ ...S.text(13, 400, C.gray700), padding: "10px 14px" }}>{a.oportunidades}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      background: C.redLight, color: C.red,
                      borderRadius: 3, padding: "2px 8px", fontSize: 11, fontWeight: 700,
                    }}>{a.ganadas}</span>
                  </td>
                  <td style={{ ...S.text(13, 700, C.black), padding: "10px 14px" }}>
                    S/ {a.cf.toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}