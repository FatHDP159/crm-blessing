import React, { useState, useMemo } from "react";
import { C, S, FONT, ESTADO_COLORS, TIPIF_COLORS } from "../../../styles/tokens";
import { PageHeader } from "../../../components/ui/SharedUI";

const REPORTE_MOCK = [
  { id:1,  asesor:"Ricardo Paredes",  ruc:"20512345678", empresa:"DISTRIBUIDORA NORTE SAC",  producto:"Portabilidad",      cantidad:5,  cargoFijo:12000, estado:"Negociada Aprobada",  fecha:"2024-07-15" },
  { id:2,  asesor:"Ricardo Paredes",  ruc:"20601234567", empresa:"TECNO PERÚ EIRL",           producto:"Fibra",             cantidad:12, cargoFijo:28000, estado:"Propuesta Entregada", fecha:"2024-08-20" },
  { id:3,  asesor:"Ricardo Paredes",  ruc:"20700123456", empresa:"COMERCIAL EL SOL SA",       producto:"Cloud",             cantidad:3,  cargoFijo:8500,  estado:"Negociación",         fecha:"2024-09-01" },
  { id:4,  asesor:"Lucía Fernández",  ruc:"20800234567", empresa:"INVERSIONES DELTA SRL",     producto:"Renovación",        cantidad:8,  cargoFijo:19000, estado:"Identificada",        fecha:"2024-07-30" },
  { id:5,  asesor:"Lucía Fernández",  ruc:"20900345678", empresa:"GRUPO ANDINO SAC",          producto:"HFC o FTTH",        cantidad:20, cargoFijo:45000, estado:"Negociada Rechazada", fecha:"2024-10-05" },
  { id:6,  asesor:"Marco Quispe",     ruc:"20213456789", empresa:"BANCO REGIONAL DEL NORTE",  producto:"Licencias Google",  cantidad:35, cargoFijo:78000, estado:"Negociada Aprobada",  fecha:"2024-09-12" },
  { id:7,  asesor:"Marco Quispe",     ruc:"20314567890", empresa:"AGRO EXPORT PERÚ SAC",      producto:"Alta",              cantidad:6,  cargoFijo:14000, estado:"Negociación",         fecha:"2024-08-05" },
  { id:8,  asesor:"Daniela Torres",   ruc:"20415678901", empresa:"EXPORT TEXTIL SAC",         producto:"SVA",               cantidad:9,  cargoFijo:21000, estado:"Propuesta Entregada", fecha:"2024-09-18" },
  { id:9,  asesor:"Sergio Mamani",    ruc:"20516789012", empresa:"MINERA SUR PERÚ EIRL",      producto:"Portabilidad",      cantidad:15, cargoFijo:33000, estado:"Negociada Aprobada",  fecha:"2024-10-01" },
  { id:10, asesor:"Sergio Mamani",    ruc:"20617890123", empresa:"CONSTRUCTORA ANDINA SA",    producto:"Renovación",        cantidad:4,  cargoFijo:9500,  estado:"Identificada",        fecha:"2024-08-14" },
];

const ASESORES    = ["Todos", "Ricardo Paredes", "Lucía Fernández", "Marco Quispe", "Daniela Torres", "Sergio Mamani"];
const ESTADOS_OPS = ["Todos", "Identificada", "Propuesta Entregada", "Negociación", "Negociada Aprobada", "Negociada Rechazada"];
const PRODUCTOS   = ["Todos", "Portabilidad", "Renovación", "Fibra", "HFC o FTTH", "Cloud", "Alta", "Licencias Google", "Licencias Microsoft", "SVA"];

export default function Reportes() {
  const [desde, setDesde]             = useState("");
  const [hasta, setHasta]             = useState("");
  const [asesorFiltro, setAsesorFiltro] = useState("Todos");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [productoFiltro, setProductoFiltro] = useState("Todos");

  const filtrados = useMemo(() => {
    return REPORTE_MOCK.filter(r => {
      const matchA = asesorFiltro  === "Todos" || r.asesor   === asesorFiltro;
      const matchE = estadoFiltro  === "Todos" || r.estado   === estadoFiltro;
      const matchP = productoFiltro === "Todos" || r.producto === productoFiltro;
      const matchD = !desde || r.fecha >= desde;
      const matchH = !hasta || r.fecha <= hasta;
      return matchA && matchE && matchP && matchD && matchH;
    });
  }, [asesorFiltro, estadoFiltro, productoFiltro, desde, hasta]);

  const totalCF = filtrados.reduce((acc, r) => acc + r.cargoFijo, 0);

  const exportar = () => {
    const rows = [
      "Asesor\tRUC\tEmpresa\tProducto\tCantidad\tCargo Fijo\tEstado\tFecha",
      ...filtrados.map(r =>
        `${r.asesor}\t${r.ruc}\t${r.empresa}\t${r.producto}\t${r.cantidad}\tS/ ${r.cargoFijo.toLocaleString()}\t${r.estado}\t${r.fecha}`
      ),
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows], { type: "text/tab-separated-values" }));
    a.download = "reporte_equipo.xls";
    a.click();
  };

  return (
    <div>
      <PageHeader title="Reportes" subtitle="Exporta y filtra la data completa del equipo" />

      {/* Filtros */}
      <div style={{
        ...S.card, padding: "16px 20px",
        marginBottom: 20,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))",
        gap: 12,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={S.text(11, 700, C.gray500)}>DESDE</label>
          <input type="date" value={desde} onChange={e => setDesde(e.target.value)}
            style={S.input}
            onFocus={e => e.target.style.borderColor = C.red}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={S.text(11, 700, C.gray500)}>HASTA</label>
          <input type="date" value={hasta} onChange={e => setHasta(e.target.value)}
            style={S.input}
            onFocus={e => e.target.style.borderColor = C.red}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={S.text(11, 700, C.gray500)}>ASESOR</label>
          <select value={asesorFiltro} onChange={e => setAsesorFiltro(e.target.value)}
            style={{ ...S.input, appearance: "none" }}
            onFocus={e => e.target.style.borderColor = C.red}
            onBlur={e => e.target.style.borderColor = C.border}
          >
            {ASESORES.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={S.text(11, 700, C.gray500)}>ESTADO</label>
          <select value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)}
            style={{ ...S.input, appearance: "none" }}
            onFocus={e => e.target.style.borderColor = C.red}
            onBlur={e => e.target.style.borderColor = C.border}
          >
            {ESTADOS_OPS.map(e => <option key={e}>{e}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={S.text(11, 700, C.gray500)}>PRODUCTO</label>
          <select value={productoFiltro} onChange={e => setProductoFiltro(e.target.value)}
            style={{ ...S.input, appearance: "none" }}
            onFocus={e => e.target.style.borderColor = C.red}
            onBlur={e => e.target.style.borderColor = C.border}
          >
            {PRODUCTOS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Resumen + exportar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ ...S.card, padding: "10px 18px" }}>
            <span style={S.text(11, 700, C.gray500)}>REGISTROS: </span>
            <span style={S.text(16, 800, C.black)}>{filtrados.length}</span>
          </div>
          <div style={{ ...S.card, padding: "10px 18px" }}>
            <span style={S.text(11, 700, C.gray500)}>CF TOTAL: </span>
            <span style={S.text(16, 800, C.red)}>S/ {totalCF.toLocaleString()}</span>
          </div>
        </div>
        <button
          style={S.btn("primary")}
          onClick={exportar}
          onMouseEnter={e => e.currentTarget.style.background = C.redDark}
          onMouseLeave={e => e.currentTarget.style.background = C.red}
        >↓ Exportar Excel</button>
      </div>

      {/* Tabla */}
      <div style={{ ...S.card, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
          <thead>
            <tr style={{ background: C.black }}>
              {["Asesor", "RUC", "Empresa", "Producto", "Cant.", "Cargo Fijo", "Estado", "Fecha"].map(col => (
                <th key={col} style={{
                  padding: "11px 14px", textAlign: "left",
                  color: C.white, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}>{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((r, i) => {
              const ec = ESTADO_COLORS[r.estado] || ESTADO_COLORS["Identificada"];
              return (
                <tr key={r.id}
                  style={{ background: i % 2 === 0 ? C.white : C.gray100, borderBottom: `1px solid ${C.border}`, transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FFEBEE"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.white : C.gray100}
                >
                  <td style={{ ...S.text(12, 700, C.black), padding: "10px 14px" }}>{r.asesor}</td>
                  <td style={{ ...S.text(11, 600, C.red), padding: "10px 14px", fontFamily: "'Courier New', monospace" }}>{r.ruc}</td>
                  <td style={{ ...S.text(12, 400, C.gray700), padding: "10px 14px" }}>{r.empresa}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      background: C.gray800, color: C.white,
                      borderRadius: 3, padding: "2px 8px", fontSize: 11, fontWeight: 600,
                    }}>{r.producto}</span>
                  </td>
                  <td style={{ ...S.text(13, 700, C.black), padding: "10px 14px", textAlign: "center" }}>{r.cantidad}</td>
                  <td style={{ ...S.text(13, 700, C.black), padding: "10px 14px" }}>S/ {r.cargoFijo.toLocaleString()}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      background: ec.bg, color: ec.text,
                      border: `1px solid ${ec.border}`,
                      borderRadius: 3, padding: "3px 10px",
                      fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                    }}>{r.estado}</span>
                  </td>
                  <td style={{ ...S.text(12, 400, C.gray500), padding: "10px 14px" }}>{r.fecha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={S.text(14, 500, C.gray500)}>Sin resultados para los filtros aplicados</div>
          </div>
        )}
      </div>
    </div>
  );
}