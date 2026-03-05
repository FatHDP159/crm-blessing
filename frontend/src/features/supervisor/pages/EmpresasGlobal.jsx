import React, { useState, useMemo } from "react";
import { C, S, FONT, TIPIF_COLORS } from "../../../styles/tokens";
import { PageHeader } from "../../../components/ui/SharedUI";

const EMPRESAS_MOCK = [
  { id:1, ruc:"20512345678", nombre:"DISTRIBUIDORA NORTE SAC",   asesor:"Ricardo Paredes",  fechaAsig:"2024-03-10", lineas:5,  tipif:"Cliente interesado" },
  { id:2, ruc:"20601234567", nombre:"TECNO PERÚ EIRL",           asesor:"Ricardo Paredes",  fechaAsig:"2024-02-01", lineas:12, tipif:"Cliente Claro" },
  { id:3, ruc:"20700123456", nombre:"COMERCIAL EL SOL SA",       asesor:"Ricardo Paredes",  fechaAsig:"2024-04-05", lineas:3,  tipif:null },
  { id:4, ruc:"20800234567", nombre:"INVERSIONES DELTA SRL",     asesor:"Lucía Fernández",  fechaAsig:"2024-01-20", lineas:8,  tipif:"Cliente con deuda" },
  { id:5, ruc:"20900345678", nombre:"GRUPO ANDINO SAC",          asesor:"Lucía Fernández",  fechaAsig:"2024-05-12", lineas:20, tipif:null },
  { id:6, ruc:"20100456789", nombre:"SERVICIOS INTEGRADOS EP",   asesor:"Marco Quispe",     fechaAsig:"2024-06-01", lineas:1,  tipif:"RUC sin contacto" },
  { id:7, ruc:"20213456789", nombre:"BANCO REGIONAL DEL NORTE",  asesor:"Marco Quispe",     fechaAsig:"2024-03-22", lineas:35, tipif:"Cliente Claro" },
  { id:8, ruc:"20314567890", nombre:"AGRO EXPORT PERÚ SAC",      asesor:"Marco Quispe",     fechaAsig:"2024-02-14", lineas:6,  tipif:null },
  { id:9, ruc:"20415678901", nombre:"EXPORT TEXTIL SAC",         asesor:"Daniela Torres",   fechaAsig:"2024-04-18", lineas:9,  tipif:"Cliente interesado" },
  { id:10,ruc:"20516789012", nombre:"MINERA SUR PERÚ EIRL",      asesor:"Sergio Mamani",    fechaAsig:"2024-05-30", lineas:15, tipif:"Cliente Claro" },
  { id:11,ruc:"20617890123", nombre:"CONSTRUCTORA ANDINA SA",    asesor:"Sergio Mamani",    fechaAsig:"2024-03-05", lineas:4,  tipif:null },
  { id:12,ruc:"20718901234", nombre:"IMPORTADORA DEL PACÍFICO",  asesor:"Daniela Torres",   fechaAsig:"2024-02-22", lineas:22, tipif:"Cliente no contesta" },
];

const ASESORES = ["Todos", "Ricardo Paredes", "Lucía Fernández", "Marco Quispe", "Daniela Torres", "Sergio Mamani"];
const LINEAS_OPTS = ["Todas", "1-5", "6-15", "16+"];

const formatDate = (d) => {
  if (!d) return "—";
  const [y, m, dd] = d.split("-");
  return `${y.slice(2)}/${m}/${dd}`;
};

export default function EmpresasGlobal() {
  const [busqueda, setBusqueda]         = useState("");
  const [asesorFiltro, setAsesorFiltro] = useState("Todos");
  const [filtroLineas, setFiltroLineas] = useState("Todas");

  const filtradas = useMemo(() => {
    return EMPRESAS_MOCK.filter(e => {
      const q = busqueda.toLowerCase();
      const matchQ = !q || e.nombre.toLowerCase().includes(q) || e.ruc.includes(q);
      const matchA = asesorFiltro === "Todos" || e.asesor === asesorFiltro;
      const matchL =
        filtroLineas === "Todas" ? true :
        filtroLineas === "1-5"   ? e.lineas <= 5 :
        filtroLineas === "6-15"  ? e.lineas >= 6 && e.lineas <= 15 :
        e.lineas >= 16;
      return matchQ && matchA && matchL;
    });
  }, [busqueda, asesorFiltro, filtroLineas]);

  const exportar = () => {
    const rows = [
      "RUC\tEmpresa\tAsesor\tFecha Asig.\tLíneas\tTipificación",
      ...filtradas.map(e => `${e.ruc}\t${e.nombre}\t${e.asesor}\t${e.fechaAsig}\t${e.lineas}\t${e.tipif || "-"}`),
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows], { type: "text/tab-separated-values" }));
    a.download = "empresas_global.xls";
    a.click();
  };

  return (
    <div>
      <PageHeader title="Empresas" subtitle={`${EMPRESAS_MOCK.length} cuentas en total`} />

      {/* Toolbar */}
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

        <select
          value={asesorFiltro}
          onChange={e => setAsesorFiltro(e.target.value)}
          style={{ ...S.input, appearance: "none" }}
          onFocus={e => e.target.style.borderColor = C.red}
          onBlur={e => e.target.style.borderColor = C.border}
        >
          {ASESORES.map(a => <option key={a}>{a}</option>)}
        </select>

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
      </div>

      {/* Tabla */}
      <div style={{ ...S.card, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
          <thead>
            <tr style={{ background: C.black }}>
              {["RUC", "Empresa", "Asesor", "F. Asignación", "Líneas", "Tipificación"].map(col => (
                <th key={col} style={{
                  padding: "11px 14px", textAlign: "left",
                  color: C.white, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}>{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtradas.map((e, i) => {
              const tipifCol = e.tipif ? TIPIF_COLORS[e.tipif] : null;
              return (
                <tr key={e.id}
                  style={{ background: i % 2 === 0 ? C.white : C.gray100, borderBottom: `1px solid ${C.border}`, transition: "background 0.1s" }}
                  onMouseEnter={ev => ev.currentTarget.style.background = "#FFEBEE"}
                  onMouseLeave={ev => ev.currentTarget.style.background = i % 2 === 0 ? C.white : C.gray100}
                >
                  <td style={{ ...S.text(12, 700, C.red), padding: "10px 14px", fontFamily: "'Courier New', monospace" }}>{e.ruc}</td>
                  <td style={{ ...S.text(13, 600, C.black), padding: "10px 14px" }}>{e.nombre}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      background: C.gray800, color: C.white,
                      borderRadius: 3, padding: "2px 8px", fontSize: 11, fontWeight: 600,
                    }}>{e.asesor}</span>
                  </td>
                  <td style={{ ...S.text(12, 400, C.gray500), padding: "10px 14px" }}>{formatDate(e.fechaAsig)}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{
                      background: C.black, color: C.white,
                      borderRadius: 3, padding: "2px 8px", fontSize: 11, fontWeight: 700,
                    }}>{e.lineas} L.</span>
                  </td>
                  <td style={{ padding: "10px 14px" }}>
                    {tipifCol ? (
                      <span style={{
                        background: tipifCol.bg, color: tipifCol.text,
                        borderRadius: 3, padding: "3px 10px", fontSize: 11, fontWeight: 700,
                      }}>{e.tipif}</span>
                    ) : (
                      <span style={{ color: C.gray300, fontSize: 12 }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtradas.length === 0 && (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={S.text(14, 500, C.gray500)}>Sin resultados</div>
          </div>
        )}
      </div>
    </div>
  );
}