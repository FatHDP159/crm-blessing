import React, { useState, useMemo } from "react";
import { C, S, FONT, ESTADO_COLORS } from "../../../styles/tokens";
import { PageHeader, Overlay, ModalBox } from "../../../components/ui/SharedUI";

const ASESORES_MOCK = [
  {
    id: 1, nombre: "Ricardo Paredes", email: "rparedes@blessing.com", telefono: "987654321",
    empresas: 93, tipificados: 47, oportunidades: 36, ganadas: 18, cf: 284000,
    clientes: [
      { ruc: "20512345678", razonSocial: "DISTRIBUIDORA NORTE SAC", estado: "Negociada Aprobada", oportunidades: 2 },
      { ruc: "20601234567", razonSocial: "TECNO PERÚ EIRL",         estado: "Propuesta Entregada", oportunidades: 3 },
      { ruc: "20700123456", razonSocial: "COMERCIAL EL SOL SA",     estado: "Negociación",         oportunidades: 1 },
    ],
  },
  {
    id: 2, nombre: "Lucía Fernández", email: "lfernandez@blessing.com", telefono: "976543210",
    empresas: 78, tipificados: 41, oportunidades: 29, ganadas: 14, cf: 198000,
    clientes: [
      { ruc: "20800234567", razonSocial: "INVERSIONES DELTA SRL",    estado: "Identificada",       oportunidades: 4 },
      { ruc: "20900345678", razonSocial: "GRUPO ANDINO SAC",         estado: "Negociada Rechazada", oportunidades: 1 },
    ],
  },
  {
    id: 3, nombre: "Marco Quispe", email: "mquispe@blessing.com", telefono: "965432109",
    empresas: 105, tipificados: 55, oportunidades: 44, ganadas: 22, cf: 312000,
    clientes: [
      { ruc: "20213456789", razonSocial: "BANCO REGIONAL DEL NORTE", estado: "Negociada Aprobada", oportunidades: 5 },
      { ruc: "20314567890", razonSocial: "AGRO EXPORT PERÚ SAC",     estado: "Negociación",        oportunidades: 2 },
    ],
  },
  {
    id: 4, nombre: "Daniela Torres", email: "dtorres@blessing.com", telefono: "954321098",
    empresas: 60, tipificados: 30, oportunidades: 21, ganadas: 9, cf: 145000,
    clientes: [
      { ruc: "20415678901", razonSocial: "EXPORT TEXTIL SAC",        estado: "Propuesta Entregada", oportunidades: 2 },
    ],
  },
  {
    id: 5, nombre: "Sergio Mamani", email: "smamani@blessing.com", telefono: "943210987",
    empresas: 88, tipificados: 43, oportunidades: 31, ganadas: 16, cf: 220000,
    clientes: [
      { ruc: "20516789012", razonSocial: "MINERA SUR PERÚ EIRL",     estado: "Negociación",        oportunidades: 3 },
      { ruc: "20617890123", razonSocial: "CONSTRUCTORA ANDINA SA",   estado: "Identificada",       oportunidades: 1 },
    ],
  },
];

function ModalAsesor({ asesor, onClose }) {
  const stats = [
    { label: "Empresas asignadas", value: asesor.empresas },
    { label: "Clientes tipificados", value: asesor.tipificados },
    { label: "Oportunidades",       value: asesor.oportunidades },
    { label: "Ganadas",             value: asesor.ganadas },
    { label: "CF Total",            value: `S/ ${asesor.cf.toLocaleString()}` },
  ];

  return (
    <Overlay onClose={onClose}>
      <ModalBox title={asesor.nombre} sub={asesor.email} onClose={onClose} wide>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))",
          gap: 10, marginBottom: 20,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ ...S.card, padding: "12px 14px", position: "relative", overflow: "hidden" }}>
              <div style={S.text(10, 700, C.gray500)}>{s.label.toUpperCase()}</div>
              <div style={{ ...S.text(20, 800, C.black), marginTop: 4 }}>{s.value}</div>
              {i === 3 && <div style={{ position: "absolute", bottom: 0, left: 0, width: "40%", height: 3, background: C.red }} />}
            </div>
          ))}
        </div>

        {/* Info contacto */}
        <div style={{ ...S.card, padding: "12px 16px", marginBottom: 20 }}>
          <div style={S.text(11, 700, C.gray500)}>INFORMACIÓN DE CONTACTO</div>
          <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
            <div style={S.text(13, 400, C.gray700)}>📞 {asesor.telefono}</div>
            <div style={S.text(13, 400, C.gray700)}>✉️ {asesor.email}</div>
          </div>
        </div>

        {/* Tabla clientes */}
        <div style={{ ...S.card, overflow: "hidden" }}>
          <div style={{
            padding: "10px 14px", borderBottom: `1px solid ${C.border}`,
            ...S.text(11, 700, C.gray500), letterSpacing: "0.06em",
          }}>CLIENTES ACTIVOS</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
            <thead>
              <tr style={{ background: C.black }}>
                {["RUC", "Razón Social", "Oportunidades", "Estado"].map(col => (
                  <th key={col} style={{
                    padding: "9px 14px", textAlign: "left",
                    color: C.white, fontSize: 11, fontWeight: 700,
                  }}>{col.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {asesor.clientes.map((c, i) => {
                const ec = ESTADO_COLORS[c.estado] || ESTADO_COLORS["Identificada"];
                return (
                  <tr key={c.ruc}
                    style={{ background: i % 2 === 0 ? C.white : C.gray100, borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ ...S.text(12, 700, C.red), padding: "9px 14px", fontFamily: "'Courier New', monospace" }}>{c.ruc}</td>
                    <td style={{ ...S.text(13, 600, C.black), padding: "9px 14px" }}>{c.razonSocial}</td>
                    <td style={{ padding: "9px 14px", textAlign: "center" }}>
                      <span style={{
                        background: C.black, color: C.white,
                        borderRadius: 12, padding: "2px 10px", fontSize: 11, fontWeight: 700,
                      }}>{c.oportunidades}</span>
                    </td>
                    <td style={{ padding: "9px 14px" }}>
                      <span style={{
                        background: ec.bg, color: ec.text,
                        border: `1px solid ${ec.border}`,
                        borderRadius: 3, padding: "3px 10px",
                        fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                      }}>{c.estado}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <button style={S.btn("secondary")} onClick={onClose}>Cerrar</button>
        </div>
      </ModalBox>
    </Overlay>
  );
}

export default function Asesores() {
  const [busqueda, setBusqueda]     = useState("");
  const [modalAsesor, setModalAsesor] = useState(null);

  const filtrados = useMemo(() => {
    const q = busqueda.toLowerCase();
    return ASESORES_MOCK.filter(a =>
      !q || a.nombre.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
    );
  }, [busqueda]);

  return (
    <div>
      <PageHeader title="Asesores" subtitle={`${ASESORES_MOCK.length} asesores en el equipo`} />

      {/* Buscador */}
      <div style={{ position: "relative", maxWidth: 340, marginBottom: 20 }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: C.gray300 }}>⌕</span>
        <input
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar asesor..."
          style={{ ...S.input, width: "100%", paddingLeft: 30 }}
          onFocus={e => e.target.style.borderColor = C.red}
          onBlur={e => e.target.style.borderColor = C.border}
        />
      </div>

      {/* Tabla */}
      <div style={{ ...S.card, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
          <thead>
            <tr style={{ background: C.black }}>
              {["Asesor", "Empresas", "Tipificados", "Oportunidades", "Ganadas", "CF Total", "Detalle"].map(col => (
                <th key={col} style={{
                  padding: "11px 14px", textAlign: "left",
                  color: C.white, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                }}>{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a, i) => (
              <tr key={a.id}
                style={{ background: i % 2 === 0 ? C.white : C.gray100, borderBottom: `1px solid ${C.border}`, transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#FFEBEE"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.white : C.gray100}
              >
                <td style={{ padding: "11px 14px" }}>
                  <div style={S.text(13, 700, C.black)}>{a.nombre}</div>
                  <div style={S.text(11, 400, C.gray500)}>{a.email}</div>
                </td>
                <td style={{ ...S.text(13, 400, C.gray700), padding: "11px 14px" }}>{a.empresas}</td>
                <td style={{ ...S.text(13, 400, C.gray700), padding: "11px 14px" }}>{a.tipificados}</td>
                <td style={{ ...S.text(13, 400, C.gray700), padding: "11px 14px" }}>{a.oportunidades}</td>
                <td style={{ padding: "11px 14px" }}>
                  <span style={{
                    background: C.redLight, color: C.red,
                    borderRadius: 3, padding: "2px 8px", fontSize: 11, fontWeight: 700,
                  }}>{a.ganadas}</span>
                </td>
                <td style={{ ...S.text(13, 700, C.black), padding: "11px 14px" }}>
                  S/ {a.cf.toLocaleString()}
                </td>
                <td style={{ padding: "11px 14px" }}>
                  <button
                    onClick={() => setModalAsesor(a)}
                    style={{ ...S.btn("primary"), fontSize: 11, padding: "6px 12px" }}
                    onMouseEnter={e => e.currentTarget.style.background = C.redDark}
                    onMouseLeave={e => e.currentTarget.style.background = C.red}
                  >Ver detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAsesor && (
        <ModalAsesor asesor={modalAsesor} onClose={() => setModalAsesor(null)} />
      )}
    </div>
  );
}