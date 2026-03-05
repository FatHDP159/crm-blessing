import React, { useState, useMemo, useEffect } from "react";
import { C, S, FONT, TIPIF_COLORS, TIPIFICACIONES, PRODUCTOS } from "../../../styles/tokens";
import { PageHeader, Overlay, ModalBox, ContactoCarrusel } from "../../../components/ui/SharedUI";

const EMPRESAS_INIT = [
  {
    id: 1, ruc: "20512345678", nombre: "DISTRIBUIDORA NORTE SAC",
    fechaAsig: "03-04-2026", fechaDes: "15-04-2026", lineas: 5, tipif: null,
    contactos: [
      { nombre: "Carlos Mendoza", dni: "43512678", tel: "987654321", email: "cmendoza@norte.com", cargo: "Gerente" },
      { nombre: "Ana Torres",     dni: "45123890", tel: "976543210", email: "atorres@norte.com",  cargo: "Administ." },
    ],
  },
  {
    id: 2, ruc: "20601234567", nombre: "TECNO PERÚ EIRL",
    fechaAsig: "15-04-2026", fechaDes: "20-04-2026", lineas: 12, tipif: "Cliente Claro",
    contactos: [
      { nombre: "José Quispe", dni: "46789012", tel: "965432109", email: "jquispe@tecnoperu.com", cargo: "Director" },
    ],
  },
  {
    id: 3, ruc: "20700123456", nombre: "COMERCIAL EL SOL SA",
    fechaAsig: "04-04-2026", fechaDes: "10-04-2026", lineas: 3, tipif: null,
    contactos: [
      { nombre: "María Flores", dni: "47890123", tel: "954321098", email: "mflores@elsol.com",   cargo: "Socia"    },
      { nombre: "Pedro Salas",  dni: "48901234", tel: "943210987", email: "psalas@elsol.com",    cargo: "Contador" },
      { nombre: "Lucía Vargas", dni: "49012345", tel: "932109876", email: "lvargas@elsol.com",   cargo: "Logística"},
    ],
  },
  {
    id: 4, ruc: "20800234567", nombre: "INVERSIONES DELTA SRL",
    fechaAsig: "24-04-2026", fechaDes: "30-04-2026", lineas: 8, tipif: "Cliente con deuda",
    contactos: [
      { nombre: "Roberto Chávez", dni: "50123456", tel: "921098765", email: "rchavez@delta.com", cargo: "CEO" },
    ],
  },
  {
    id: 5, ruc: "20900345678", nombre: "GRUPO ANDINO SAC",
    fechaAsig: "13-04-2026", fechaDes: "19-04-2026", lineas: 20, tipif: null,
    contactos: [
      { nombre: "Sofía Ramos", dni: "51234567", tel: "910987654", email: "sramos@andino.com",    cargo: "Presidenta"   },
      { nombre: "Diego Lara",  dni: "52345678", tel: "909876543", email: "dlara@andino.com",    cargo: "VP Comercial" },
    ],
  },
  {
    id: 6, ruc: "20100456789", nombre: "SERVICIOS INTEGRADOS EP",
    fechaAsig: "06-04-2026", fechaDes: "16-04-2026", lineas: 1, tipif: "RUC sin contacto",
    contactos: [],
  },
  {
    id: 7, ruc: "20213456789", nombre: "BANCO REGIONAL DEL NORTE",
    fechaAsig: "23-04-2026", fechaDes: "28-04-2026", lineas: 35, tipif: "Cliente interesado",
    contactos: [
      { nombre: "Laura Gutiérrez", dni: "53456789", tel: "998877665", email: "lgutierrez@brn.com", cargo: "Subgerente" },
    ],
  },
  {
    id: 8, ruc: "20314567890", nombre: "AGRO EXPORT PERÚ SAC",
    fechaAsig: "12-04-2026", fechaDes: "18-04-2026", lineas: 6, tipif: null,
    contactos: [
      { nombre: "Miguel Ríos", dni: "54567890", tel: "977665544", email: "mrios@agro.com", cargo: "Gerente Comercial" },
    ],
  },
];

const formatDate = (d) => {
  if (!d) return "—";
  const [dd, mm, yyyy] = d.split("-");
  return `${dd}/${mm}/${yyyy.slice(2)}`;
};

// --- MODALES ---

function ModalContacto({ empresa, onClose, onGuardar }) {
  const [form, setForm] = useState({ nombre: "", dni: "", tel: "", email: "", cargo: "" });
  const campos = [
    ["nombre", "Nombre completo", "1/-1"],
    ["dni",     "DNI",             undefined],
    ["tel",     "Teléfono",        undefined],
    ["email",   "Email",           "1/-1"],
    ["cargo",   "Cargo",           undefined],
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
  // Añadimos un estado para controlar qué contacto estamos viendo DENTRO del modal
  const [idxActivo, setIdxActivo] = useState(0); 
  
  const [form, setForm] = useState({
    nombreC: "", dniC: "", telC: "", emailC: "",
    titulo: "", producto: "", cantidad: ""
  });

  // EFECTO: Sincroniza el formulario cuando cambia el contacto activo o la empresa
  useEffect(() => {
    if (sel === "Cliente interesado") {
      const c = empresa.contactoActivo;
      if (c) {
        setForm(prev => ({ 
          ...prev, 
          nombreC: c.nombre || "",
          dniC: c.dni || "",
          telC: c.tel || "",
          emailC: c.email || "",
          titulo: `Oportunidad: ${empresa.nombre}` 
        }));
      } else {
        // Si no hay contacto, limpiar campos de contacto
        setForm(prev => ({ ...prev, nombreC: "", dniC: "", telC: "", emailC: "", titulo: `Oportunidad: ${empresa.nombre}` }));
      }
    }
  }, [sel, empresa.contactoActivo, empresa.nombre]); // Escucha cambios en el contacto activo
  
  return (
    <Overlay onClose={onClose}>
      <ModalBox title="Tipificar Empresa" sub={empresa.nombre} onClose={onClose} wide={sel === "Cliente interesado"}>
        
        {/* Opciones de tipificación */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {TIPIFICACIONES.map(op => {
            const isSelected = sel === op;
            const col = TIPIF_COLORS[op] || { bg: C.gray100, text: C.gray700 };
            return (
              <button key={op} onClick={() => setSel(op)} style={{
                textAlign: "left", padding: "12px 16px", borderRadius: 6, cursor: "pointer",
                fontFamily: FONT, fontSize: 13, fontWeight: isSelected ? 700 : 400,
                background: isSelected ? col.bg : C.white,
                border: `1.5px solid ${isSelected ? C.red : C.border}`,
                color: isSelected ? col.text : C.gray700,
              }}>
                <span style={{ marginRight: 10 }}>{isSelected ? "●" : "○"}</span>{op}
              </button>
            );
          })}
        </div>

        {/* Formulario que se actualiza con el carrusel */}
        {sel === "Cliente interesado" && (
          <div style={{ background: "#FFF8F8", borderRadius: 8, padding: 20, border: "1px solid #FFEBEE", marginBottom: 20 }}>
            <div style={{ ...S.text(11, 800, C.red), marginBottom: 16 }}>DATOS DE CONTACTO Y OPORTUNIDAD</div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 16px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={S.text(10, 700, C.gray500)}>NOMBRE DEL CONTACTO</label>
                <input value={form.nombreC} onChange={e => setForm({...form, nombreC: e.target.value})} style={{ ...S.input, width: "100%" }} />
              </div>

              <div>
                <label style={S.text(10, 700, C.gray500)}>DNI</label>
                <input value={form.dniC} onChange={e => setForm({...form, dniC: e.target.value})} style={{ ...S.input, width: "100%" }} />
              </div>
              <div>
                <label style={S.text(10, 700, C.gray500)}>TELÉFONO</label>
                <input value={form.telC} onChange={e => setForm({...form, telC: e.target.value})} style={{ ...S.input, width: "100%" }} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={S.text(10, 700, C.gray500)}>CORREO ELECTRÓNICO</label>
                <input value={form.emailC} onChange={e => setForm({...form, emailC: e.target.value})} style={{ ...S.input, width: "100%" }} />
              </div>

              <div style={{ gridColumn: "1 / -1", borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
                <label style={S.text(10, 700, C.gray500)}>TÍTULO DE LA OPORTUNIDAD</label>
                <input value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} style={{ ...S.input, width: "100%" }} />
              </div>

              <div>
                <label style={S.text(10, 700, C.gray500)}>PRODUCTO</label>
                <select value={form.producto} onChange={e => setForm({...form, producto: e.target.value})} style={{ ...S.input, width: "100%" }}>
                  <option value="">Seleccionar...</option>
                  {PRODUCTOS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={S.text(10, 700, C.gray500)}>CANTIDAD</label>
                <input type="number" value={form.cantidad} onChange={e => setForm({...form, cantidad: e.target.value})} style={{ ...S.input, width: "100%" }} />
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button style={S.btn("secondary")} onClick={onClose}>Cancelar</button>
          <button 
            disabled={!sel} 
            onClick={() => { onGuardar(empresa.id, sel); onClose(); }} 
            style={{ ...S.btn("primary"), opacity: sel ? 1 : 0.4 }}
          >
            Guardar
          </button>
        </div>
      </ModalBox>
    </Overlay>
  );
}
// --- CARDS ---
function EmpresaCard({ empresa, onTipificar, onAddContacto }) {
  const [idxActivo, setIdxActivo] = useState(0);

  // Cada vez que cambia el idxActivo o se presiona el botón, actualizamos el padre
  const handleTipificar = () => {
    onTipificar({ 
      ...empresa, 
      contactoActivo: empresa.contactos[idxActivo] || null 
    });
  };

  return (  
    <div style={{ ...S.card, display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 14px 10px", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ ...S.text(11, 700, C.red) }}>RUC {empresa.ruc}</span>
        <div style={{ ...S.text(14, 800, C.black) }}>{empresa.nombre}</div>
      </div>
      
      <div style={{ padding: "10px 14px", flex: 1 }}>
        <ContactoCarrusel 
          contactos={empresa.contactos} 
          onIndexChange={(idx) => setIdxActivo(idx)} 
        />
      </div>

      <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", background: C.gray100 }}>
        <button style={S.btn("secondary")} onClick={() => onAddContacto(empresa)}>+ Contacto</button>
        <button style={S.btn("primary")} onClick={handleTipificar}>
          Tipificar
        </button>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---

export default function Empresas() {
  const [empresas, setEmpresas] = useState(EMPRESAS_INIT);
  const [busqueda, setBusqueda] = useState("");
  const [filtroLineas, setFiltroLineas] = useState(""); 
  const [modalTipif, setModalTipif] = useState(null);
  const [modalContacto, setModalContacto] = useState(null);

  const filtradas = useMemo(() => {
    return empresas.filter(e => {
      const q = busqueda.toLowerCase();
      const matchQ = !q || e.nombre.toLowerCase().includes(q) || e.ruc.includes(q);
      const minLineas = parseInt(filtroLineas);
      const matchL = isNaN(minLineas) ? true : e.lineas >= minLineas;
      return matchQ && matchL;
    });
  }, [empresas, busqueda, filtroLineas]);

  return (
    <div style={{ padding: 20 }}>
      <PageHeader title="Lista de Asignaciones" subtitle={`${empresas.length} cuentas asignadas`} />

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <button style={S.btn("primary")} onClick={() => {}}>↓ Exportar Excel</button>

        <div style={{ position: "relative", flex: "1 1 250px" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.gray300 }}>⌕</span>
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o RUC..."
            style={{ ...S.input, width: "100%", paddingLeft: 30 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.white, padding: "0 12px", height: 38, borderRadius: 4, border: `1.5px solid ${C.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.gray500 }}>Líneas</span>
          <input
            type="number"
            value={filtroLineas}
            onChange={e => setFiltroLineas(e.target.value)}
            style={{ border: "none", width: 50, fontWeight: 800, color: C.red, textAlign: "center", outline: "none" }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtradas.map(emp => (
          <EmpresaCard key={emp.id} empresa={emp} onTipificar={setModalTipif} onAddContacto={setModalContacto} />
        ))}
      </div>

      {modalTipif && (
        <ModalTipif 
          empresa={modalTipif} 
          onClose={() => setModalTipif(null)} 
          onGuardar={(id, tipif) => setEmpresas(prev => prev.map(e => e.id === id ? { ...e, tipif } : e))} 
        />
      )}
      {modalContacto && (
        <ModalContacto 
          empresa={modalContacto} 
          onClose={() => setModalContacto(null)} 
          onGuardar={(id, c) => setEmpresas(prev => prev.map(e => e.id === id ? { ...e, contactos: [...e.contactos, c] } : e))} 
        />
      )}
    </div>
  );
}