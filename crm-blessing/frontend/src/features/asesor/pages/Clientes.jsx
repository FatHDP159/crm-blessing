import React, { useState, useMemo } from "react";
import { C, S, FONT, ESTADO_COLORS, diasEntre, formatDate } from "../../../styles/tokens";
import { PageHeader, Overlay, ModalBox } from "../../../components/ui/SharedUI";

const CLIENTES_INIT = [
  { id:1, ruc:"20512345678", razonSocial:"DISTRIBUIDORA NORTE SAC",   fechaAsig:"15-04-2026", fechaGestion:"15-04-2026", oportunidades:2, estado:"Identificada" },
  { id:2, ruc:"20601234567", razonSocial:"TECNO PERÚ EIRL",           fechaAsig:"15-04-2026", fechaGestion:"20-04-2026", oportunidades:3, estado:"Propuesta Entregada" },
  { id:3, ruc:"20700123456", razonSocial:"COMERCIAL EL SOL SA",       fechaAsig:"04-04-2026", fechaGestion:"10-04-2026", oportunidades:1, estado:"Negociación" },
  { id:4, ruc:"20800234567", razonSocial:"INVERSIONES DELTA SRL",     fechaAsig:"24-04-2026", fechaGestion:"30-04-2026", oportunidades:4, estado:"Negociada Aprobada" },
  { id:5, ruc:"20900345678", razonSocial:"GRUPO ANDINO SAC",          fechaAsig:"13-04-2026", fechaGestion:"19-04-2026", oportunidades:1, estado:"Negociada Rechazada" },
  { id:6, ruc:"20213456789", razonSocial:"BANCO REGIONAL DEL NORTE",  fechaAsig:"23-04-2026", fechaGestion:"28-04-2026", oportunidades:5, estado:"Negociación" },
];

const ETAPAS    = ["Identificada", "Propuesta Entregada", "Negociación", "Negociada"];
const NEGOC_SUB = ["Negociada Aprobada", "Negociada Rechazada"];

function ModalCliente({ cliente, onClose, onUpdate }) {
  const [etapa, setEtapa]   = useState(
    NEGOC_SUB.includes(cliente.estado) ? "Negociada" : cliente.estado
  );
  const [subNeg, setSubNeg] = useState(
    NEGOC_SUB.includes(cliente.estado) ? cliente.estado : "Negociada Aprobada"
  );
  const [comentario, setComentario] = useState("");
  const [form, setForm] = useState({ producto: "", cantidad: "", cargoFijo: "" });

  const estadoReal = etapa === "Negociada" ? subNeg : etapa;
  const ec = ESTADO_COLORS[estadoReal] || ESTADO_COLORS["Identificada"];

  return (
    <Overlay onClose={onClose}>
      <ModalBox title="Detalle de Cuenta" sub={`${cliente.ruc} — ${cliente.razonSocial}`} onClose={onClose} wide>

        {/* Etapa tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          {ETAPAS.map(e => {
            const col = ESTADO_COLORS[e === "Negociada" ? "Negociada Aprobada" : e];
            const active = etapa === e;
            return (
              <button key={e} onClick={() => setEtapa(e)} style={{
                fontFamily: FONT, fontSize: 12, fontWeight: active ? 700 : 400,
                padding: "7px 14px", borderRadius: 4, cursor: "pointer",
                background: active ? col.bg : C.white,
                border: `1.5px solid ${active ? col.border : C.border}`,
                color: active ? col.text : C.gray700,
                transition: "all 0.15s",
              }}>{e}</button>
            );
          })}
        </div>

        {/* Sub-selector Negociada */}
        {etapa === "Negociada" && (
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {NEGOC_SUB.map(s => {
              const col = ESTADO_COLORS[s];
              return (
                <button key={s} onClick={() => setSubNeg(s)} style={{
                  fontFamily: FONT, fontSize: 12, fontWeight: subNeg === s ? 700 : 400,
                  padding: "6px 14px", borderRadius: 4, cursor: "pointer",
                  background: subNeg === s ? col.bg : C.white,
                  border: `1.5px solid ${subNeg === s ? col.border : C.border}`,
                  color: subNeg === s ? col.text : C.gray700,
                  transition: "all 0.15s",
                }}>{s}</button>
              );
            })}
          </div>
        )}

        {/* Badge estado */}
        <div style={{
          display: "inline-block", marginBottom: 16,
          background: ec.bg, color: ec.text,
          border: `1px solid ${ec.border}`,
          borderRadius: 4, padding: "4px 12px",
          fontFamily: FONT, fontSize: 11, fontWeight: 700,
        }}>{estadoReal.toUpperCase()}</div>

        {/* Info + comentario */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <div style={S.text(11, 700, C.gray500)}>INFORMACIÓN DE CUENTA</div>
            <div style={{ ...S.card, padding: 12, marginTop: 8 }}>
              {[
                ["RUC",           cliente.ruc],
                ["Razón Social",  cliente.razonSocial],
                ["F. Asignación", cliente.fechaAsig],
                ["F. Gestión",    cliente.fechaGestion],
                ["Oportunidades", cliente.oportunidades],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "5px 0", borderBottom: `1px solid ${C.border}`,
                  fontSize: 12, fontFamily: FONT,
                }}>
                  <span style={{ color: C.gray500, fontWeight: 700 }}>{k}</span>
                  <span style={{ color: C.black }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={S.text(11, 700, C.gray500)}>COMENTARIO DE GESTIÓN</div>
            <textarea
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              placeholder="Registra un comentario para esta etapa..."
              style={{
                ...S.input, marginTop: 8, width: "100%",
                minHeight: 120, resize: "vertical", verticalAlign: "top",
              }}
              onFocus={e => e.target.style.borderColor = C.red}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>
        </div>

        {/* Actualizar oportunidad */}
        <div style={{ background: C.gray100, borderRadius: 6, padding: 14, marginBottom: 16 }}>
          <div style={S.text(11, 700, C.gray500)}>ACTUALIZAR OPORTUNIDAD</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 10 }}>
            {[["producto", "Producto"], ["cantidad", "Cantidad"], ["cargoFijo", "Cargo Fijo"]].map(([k, l]) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={S.text(10, 700, C.gray500)}>{l.toUpperCase()}</label>
                <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                  style={S.input}
                  onFocus={e => e.target.style.borderColor = C.red}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, textAlign: "right" }}>
            <button style={S.btn("secondary")}>Actualizar</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", }}>
          <button style={S.btn("secondary")} onClick={onClose}>Cerrar</button>
          <button
            style={S.btn("primary")}
            onMouseEnter={e => e.currentTarget.style.background = C.redDark}
            onMouseLeave={e => e.currentTarget.style.background = C.red}
            onClick={() => { onUpdate(cliente.id, estadoReal); onClose(); }}
          >Guardar Estado</button>
        </div>
      </ModalBox>
    </Overlay>
  );
}

const COLS = ["RUC", "Razón Social", "F. Asignación", "F. Gestión", "Días", "Oportunidades", "Estado"];

export default function Clientes() {
  const [clientes, setClientes]         = useState(CLIENTES_INIT);
  const [busqueda, setBusqueda]         = useState("");
  const [desde, setDesde]               = useState("");
  const [hasta, setHasta]               = useState("");
  const [modalCliente, setModalCliente] = useState(null);

 const filtrados = useMemo(() => {
  return clientes.filter(c => {
    // 1. Filtro de búsqueda por texto (Nombre o RUC)
    const q = busqueda.toLowerCase();
    const matchQ = !q || c.razonSocial.toLowerCase().includes(q) || c.ruc.includes(q);

    // 2. NORMALIZACIÓN DE FECHAS PARA COMPARACIÓN
    // Convertimos el "DD-MM-YYYY" del cliente a "YYYY-MM-DD" (Formato ISO)
    const partes = c.fechaGestion.split("-");
    const fechaGestionISO = `${partes[2]}-${partes[1]}-${partes[0]}`; 

    // 3. Comparación lógica (ahora ambos están en formato YYYY-MM-DD)
    const matchD = !desde || fechaGestionISO >= desde;
    const matchH = !hasta || fechaGestionISO <= hasta;

    return matchQ && matchD && matchH;
  });
}, [clientes, busqueda, desde, hasta]);
  return (
    <div>
      <PageHeader title="Clientes" subtitle={`${clientes.length} clientes registrados`} />

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: C.gray300 }}>⌕</span>
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o RUC..."
            style={{ ...S.input, width: "100%", paddingLeft: 30 }}
            onFocus={e => e.target.style.borderColor = C.red}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={S.text(12, 700, C.gray500)}>DESDE</span>
          <input type="date" value={desde} onChange={e => setDesde(e.target.value)}
            style={S.input}
            onFocus={e => e.target.style.borderColor = C.red}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          <span style={S.text(12, 700, C.gray500)}>HASTA</span>
          <input type="date" value={hasta} onChange={e => setHasta(e.target.value)}
            style={S.input}
            onFocus={e => e.target.style.borderColor = C.red}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>
      </div>

      <div style={{ ...S.card, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
          <thead>
            <tr style={{ background: C.black }}>
              {COLS.map(col => (
                <th key={col} style={{
                  padding: "11px 14px", textAlign: "left",
                  color: C.white, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}>{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((c, i) => {
              const ec   = ESTADO_COLORS[c.estado] || ESTADO_COLORS["Identificada"];
              const dias = diasEntre(c.fechaAsig, c.fechaGestion);
              const diasNum = diasEntre(c.fechaAsig, c.fechaGestion);
              return (
                <tr
                  key={c.id}
                  style={{ background: i % 2 === 0 ? C.white : C.gray100, borderBottom: `1px solid ${C.border}`, transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FFEBEE"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.white : C.gray100}
                >
                  <td style={{ padding: "10px 14px" }}>
                    <button
                      onClick={() => setModalCliente(c)}
                      onMouseEnter={e => e.currentTarget.style.color = C.redDark}
                      onMouseLeave={e => e.currentTarget.style.color = C.red}
                      style={{
                        fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.red,
                        background: "none", border: "none", cursor: "pointer",
                        textDecoration: "underline", textDecorationStyle: "dotted",
                        padding: 0, transition: "color 0.15s",
                      }}
                    >{c.ruc}</button>
                  </td>
                  <td style={{ ...S.text(13, 600, C.black), padding: "10px 14px" }}>{c.razonSocial}</td>
                  <td style={{ ...S.text(12, 400, C.gray500), padding: "10px 14px" }}>{formatDate(c.fechaAsig)}</td>
                  <td style={{ ...S.text(12, 400, C.gray500), padding: "10px 14px" }}>{formatDate(c.fechaGestion)}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      ...S.text(12, 700, diasNum === 0 ? C.lastDay : C.black), // Si es 0, usa C.red
                    }}>
                      {diasNum}d
                    </span>
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "center" }}>
                    <span style={{
                      background: C.black, color: C.white,
                      borderRadius: 12, padding: "2px 10px", fontSize: 11, fontWeight: 700,
                    }}>{c.oportunidades}</span>
                  </td>
            <td style={{ padding: "10px 14px" }}>
              <span style={{
            display: "inline-block", // Necesario para que respete el width
            width: "130px",          // <--- TAMAÑO IGUAL
                textAlign: "center",     // Centra el texto dentro del badge
                background: ec.bg, 
                color: ec.text,
                border: `1px solid ${ec.border}`,
                borderRadius: 3, 
                padding: "3px 0", 
                fontSize: 11, 
                fontWeight: 700, 
                whiteSpace: "nowrap",
            }}>
                {c.estado}
              </span>
            </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={S.text(14, 500, C.gray500)}>Sin resultados para tu búsqueda</div>
          </div>
        )}
      </div>

      {modalCliente && (
        <ModalCliente
          cliente={modalCliente}
          onClose={() => setModalCliente(null)}
          onUpdate={(id, est) =>
            setClientes(prev => prev.map(c => c.id === id ? { ...c, estado: est } : c))
          }
        />
      )}
    </div>
  );
}