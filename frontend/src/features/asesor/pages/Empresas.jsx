import React, { useState, useMemo } from "react";
import { C, S, FONT, TIPIF_COLORS, TIPIFICACIONES, PRODUCTOS } from "../../../styles/tokens";
import { PageHeader, Overlay, ModalBox, ContactoCarrusel } from "../../../components/ui/SharedUI";

const EMPRESAS_INIT = [
  {
    id: 1, ruc: "20512345678", nombre: "DISTRIBUIDORA NORTE SAC",
    fechaAsig: "2024-03-10", fechaDes: null, lineas: 5, tipif: null,
    contactos: [
      { nombre: "Carlos Mendoza", dni: "43512678", tel: "987654321", email: "cmendoza@norte.com", cargo: "Gerente" },
      { nombre: "Ana Torres",     dni: "45123890", tel: "976543210", email: "atorres@norte.com",  cargo: "Administ." },
    ],
  },
  {
    id: 2, ruc: "20601234567", nombre: "TECNO PERÚ EIRL",
    fechaAsig: "2024-02-01", fechaDes: "2024-06-30", lineas: 12, tipif: "Cliente Claro",
    contactos: [
      { nombre: "José Quispe", dni: "46789012", tel: "965432109", email: "jquispe@tecnoperu.com", cargo: "Director" },
    ],
  },
  {
    id: 3, ruc: "20700123456", nombre: "COMERCIAL EL SOL SA",
    fechaAsig: "2024-04-05", fechaDes: null, lineas: 3, tipif: null,
    contactos: [
      { nombre: "María Flores", dni: "47890123", tel: "954321098", email: "mflores@elsol.com",  cargo: "Socia"    },
      { nombre: "Pedro Salas",  dni: "48901234", tel: "943210987", email: "psalas@elsol.com",   cargo: "Contador" },
      { nombre: "Lucía Vargas", dni: "49012345", tel: "932109876", email: "lvargas@elsol.com",  cargo: "Logística"},
    ],
  },
  {
    id: 4, ruc: "20800234567", nombre: "INVERSIONES DELTA SRL",
    fechaAsig: "2024-01-20", fechaDes: null, lineas: 8, tipif: "Cliente con deuda",
    contactos: [
      { nombre: "Roberto Chávez", dni: "50123456", tel: "921098765", email: "rchavez@delta.com", cargo: "CEO" },
    ],
  },
  {
    id: 5, ruc: "20900345678", nombre: "GRUPO ANDINO SAC",
    fechaAsig: "2024-05-12", fechaDes: null, lineas: 20, tipif: null,
    contactos: [
      { nombre: "Sofía Ramos", dni: "51234567", tel: "910987654", email: "sramos@andino.com",  cargo: "Presidenta"   },
      { nombre: "Diego Lara",  dni: "52345678", tel: "909876543", email: "dlara@andino.com",   cargo: "VP Comercial" },
    ],
  },
  {
    id: 6, ruc: "20100456789", nombre: "SERVICIOS INTEGRADOS EP",
    fechaAsig: "2024-06-01", fechaDes: null, lineas: 1, tipif: "RUC sin contacto",
    contactos: [],
  },
  {
    id: 7, ruc: "20213456789", nombre: "BANCO REGIONAL DEL NORTE",
    fechaAsig: "2024-03-22", fechaDes: null, lineas: 35, tipif: "Cliente interesado",
    contactos: [
      { nombre: "Laura Gutiérrez", dni: "53456789", tel: "998877665", email: "lgutierrez@brn.com", cargo: "Subgerente" },
    ],
  },
  {
    id: 8, ruc: "20314567890", nombre: "AGRO EXPORT PERÚ SAC",
    fechaAsig: "2024-02-14", fechaDes: null, lineas: 6, tipif: null,
    contactos: [
      { nombre: "Miguel Ríos", dni: "54567890", tel: "977665544", email: "mrios@agro.com", cargo: "Gerente Comercial" },
    ],
  },
];

const formatDate = (d) => {
  if (!d) return "—";
  const [y, m, dd] = d.split("-");
  return `${y.slice(2)}/${m}/${dd}`;
};

function ModalContacto({ empresa, onClose, onGuardar }) {
  const [form, setForm] = useState({ nombre: "", dni: "", tel: "", email: "", cargo: "" });
  const campos = [
    ["nombre", "Nombre completo", "1/-1"],
    ["dni",    "DNI",             undefined],
    ["tel",    "Teléfono",        undefined],
    ["email",  "Email",           "1/-1"],
    ["cargo",  "Cargo",           undefined],
  ];
  return (
    <Overlay onClose={onClose}>
      <ModalBox title="+ Agregar Contacto" sub={empresa.nombre} onClose={onClose}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {campos.map(([key, label, col]) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4, gridColumn: col }}>
              <label style={S.text(11, 700, C.gray500)}>{label.toUpperCase()}</label>
              <input
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={S.input}
                onFocus={e => e.target.style.borderColor = C.red}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button style={S.btn("secondary")} onClick={onClose}>Cancelar</button>
          <button style={S.btn("primary")} onClick={() => { onGuardar(empresa.id, form); onClose(); }}>
            Guardar Contacto
          </button>
        </div>
      </ModalBox>
    </Overlay>
  );
}

function ModalTipif({ empresa, onClose, onGuardar }) {
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState({
    persona: "", titulo: "", producto: "",
    cantidad: "", cargoFijo: "", entel: "", claro: "", totalLineas: "",
  });

  return (
    <Overlay onClose={onClose}>
      <ModalBox title="Tipificar Empresa" sub={empresa.nombre} onClose={onClose}
        wide={sel === "Cliente interesado"}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
          {TIPIFICACIONES.map(op => {
            const s = sel === op;
            const col = TIPIF_COLORS[op] || { bg: C.gray100, text: C.gray700 };
            return (
              <button key={op} onClick={() => setSel(op)} style={{
                textAlign: "left", padding: "10px 14px", borderRadius: 4, cursor: "pointer",
                fontFamily: FONT, fontSize: 13, fontWeight: s ? 700 : 400,
                background: s ? col.bg : C.white,
                border: `1.5px solid ${s ? C.red : C.border}`,
                color: s ? col.text : C.gray700,
                transition: "all 0.15s",
              }}>
                <span style={{ marginRight: 8 }}>{s ? "●" : "○"}</span>{op}
              </button>
            );
          })}
        </div>

        {sel === "Cliente interesado" && (
          <div style={{
            background: C.redLight, borderRadius: 6, padding: 16, marginBottom: 16,
            border: "1px solid #FFCDD2",
          }}>
            <div style={{ ...S.text(11, 800, C.red), marginBottom: 12, letterSpacing: "0.05em" }}>
              CREAR OPORTUNIDAD — ESTADO: IDENTIFICADA
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["persona",   "Persona de contacto", false],
                ["titulo",    "Título de oportunidad", false],
                ["producto",  "Producto", true],
                ["cantidad",  "Cantidad", false],
                ["cargoFijo", "Cargo Fijo", false],
              ].map(([key, label, isSelect]) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <label style={S.text(10, 700, C.gray500)}>{label.toUpperCase()}</label>
                  {isSelect ? (
                    <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={{ ...S.input, appearance: "none" }}
                      onFocus={e => e.target.style.borderColor = C.red}
                      onBlur={e => e.target.style.borderColor = C.border}>
                      <option value="">Seleccionar...</option>
                      {PRODUCTOS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  ) : (
                    <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={S.input}
                      onFocus={e => e.target.style.borderColor = C.red}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={S.text(10, 700, C.gray500)}>OPERADOR (LÍNEAS)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 6 }}>
                {[["entel", "Entel"], ["claro", "Claro"], ["totalLineas", "Total Líneas"]].map(([k, l]) => (
                  <div key={k} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <label style={S.text(10, 400, C.gray500)}>{l}</label>
                    <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                      style={S.input}
                      onFocus={e => e.target.style.borderColor = C.red}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button style={S.btn("secondary")} onClick={onClose}>Cancelar</button>
          <button
            disabled={!sel}
            onClick={() => { onGuardar(empresa.id, sel); onClose(); }}
            style={{ ...S.btn("primary"), opacity: sel ? 1 : 0.4, cursor: sel ? "pointer" : "not-allowed" }}
          >
            {sel === "Cliente interesado" ? "Crear Oportunidad" : "Guardar"}
          </button>
        </div>
      </ModalBox>
    </Overlay>
  );
}

function EmpresaCard({ empresa, onTipificar, onAddContacto }) {
  const [hov, setHov] = useState(false);
  const tipifCol = empresa.tipif ? TIPIF_COLORS[empresa.tipif] : null;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...S.card,
        display: "flex", flexDirection: "column",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 6px 20px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "all 0.2s",
      }}
    >
      <div style={{ padding: "12px 14px 10px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <span style={{ ...S.text(11, 700, C.red), fontFamily: "'Courier New', monospace" }}>
            RUC {empresa.ruc}
          </span>
          <div style={{ textAlign: "right" }}>
            <div style={S.text(10, 400, C.gray500)}>Asig: {formatDate(empresa.fechaAsig)}</div>
            {empresa.fechaDes && <div style={S.text(10, 400, C.gray500)}>Desasig: {formatDate(empresa.fechaDes)}</div>}
          </div>
        </div>
        <div style={{ ...S.text(14, 800, C.black), lineHeight: 1.3 }}>{empresa.nombre}</div>
        <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            background: C.black, color: C.white,
            borderRadius: 3, padding: "2px 8px", fontSize: 11, fontWeight: 700, fontFamily: FONT,
          }}>
            {empresa.lineas} línea{empresa.lineas !== 1 ? "s" : ""}
          </span>
          {tipifCol && (
            <span style={{
              background: tipifCol.bg, color: tipifCol.text,
              borderRadius: 3, padding: "2px 8px", fontSize: 10, fontWeight: 700, fontFamily: FONT,
            }}>
              {empresa.tipif}
            </span>
          )}
        </div>
      </div>

      <div style={{ padding: "10px 14px", flex: 1 }}>
        <ContactoCarrusel contactos={empresa.contactos} />
      </div>

      <div style={{
        padding: "10px 14px", borderTop: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: C.gray100,
      }}>
        <button
          style={S.btn("secondary")}
          onClick={() => onAddContacto(empresa)}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.black; e.currentTarget.style.color = C.black; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.gray700; }}
        >+ Contacto</button>
        <button
          style={S.btn("primary")}
          onClick={() => onTipificar(empresa)}
          onMouseEnter={e => e.currentTarget.style.background = C.redDark}
          onMouseLeave={e => e.currentTarget.style.background = C.red}
        >Tipificar</button>
      </div>
    </div>
  );
}

const LINEAS_OPTS = ["Todas", "1-5", "6-15", "16+"];

export default function Empresas() {
  const [empresas, setEmpresas]           = useState(EMPRESAS_INIT);
  const [busqueda, setBusqueda]           = useState("");
  const [filtroLineas, setFiltroLineas]   = useState("Todas");
  const [modalTipif, setModalTipif]       = useState(null);
  const [modalContacto, setModalContacto] = useState(null);

  const filtradas = useMemo(() => {
    return empresas.filter(e => {
      const q = busqueda.toLowerCase();
      const matchQ = !q || e.nombre.toLowerCase().includes(q) || e.ruc.includes(q);
      const matchL =
        filtroLineas === "Todas" ? true :
        filtroLineas === "1-5"   ? e.lineas <= 5 :
        filtroLineas === "6-15"  ? e.lineas >= 6 && e.lineas <= 15 :
        e.lineas >= 16;
      return matchQ && matchL;
    });
  }, [empresas, busqueda, filtroLineas]);

  const exportar = () => {
    const rows = [
      "RUC\tEmpresa\tFecha Asig.\tLíneas\tTipificación",
      ...filtradas.map(e => `${e.ruc}\t${e.nombre}\t${e.fechaAsig}\t${e.lineas}\t${e.tipif || "-"}`),
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows], { type: "text/tab-separated-values" }));
    a.download = "mis_empresas.xls";
    a.click();
  };

  return (
    <div>
      <PageHeader
        title="Lista de Asignaciones"
        subtitle={`${empresas.length} cuentas asignadas`}
      />

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <button
          style={S.btn("primary")}
          onClick={exportar}
          onMouseEnter={e => e.currentTarget.style.background = C.redDark}
          onMouseLeave={e => e.currentTarget.style.background = C.red}
        >↓ Exportar Excel</button>

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

        <div style={{ display: "flex", gap: 4 }}>
          {LINEAS_OPTS.map(o => (
            <button key={o} onClick={() => setFiltroLineas(o)}
              style={{ ...S.btn(filtroLineas === o ? "primary" : "secondary"), fontSize: 11, padding: "7px 12px" }}
            >{o} L.</button>
          ))}
        </div>
      </div>

      <div style={{ ...S.text(12, 400, C.gray500), marginBottom: 12 }}>
        Mostrando <strong style={{ color: C.black }}>{filtradas.length}</strong> empresa{filtradas.length !== 1 ? "s" : ""}
        {busqueda && <> para "<strong>{busqueda}</strong>"</>}
      </div>

      {filtradas.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⌕</div>
          <div style={S.text(15, 700, C.gray500)}>Sin resultados</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px,1fr))", gap: 14 }}>
          {filtradas.map(emp => (
            <EmpresaCard
              key={emp.id}
              empresa={emp}
              onTipificar={setModalTipif}
              onAddContacto={setModalContacto}
            />
          ))}
        </div>
      )}

      {modalTipif && (
        <ModalTipif
          empresa={modalTipif}
          onClose={() => setModalTipif(null)}
          onGuardar={(id, tipif) =>
            setEmpresas(prev => prev.map(e => e.id === id ? { ...e, tipif } : e))
          }
        />
      )}
      {modalContacto && (
        <ModalContacto
          empresa={modalContacto}
          onClose={() => setModalContacto(null)}
          onGuardar={(id, c) =>
            setEmpresas(prev => prev.map(e => e.id === id ? { ...e, contactos: [...e.contactos, c] } : e))
          }
        />
      )}
    </div>
  );
}