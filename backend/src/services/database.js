
let empresas = [
  { id: 1, nombre: "Empresa Alpha", ruc: "20111111111" },
  { id: 2, nombre: "Empresa Beta", ruc: "20222222222" }
];

module.exports = {
  getEmpresas: () => empresas,
  addEmpresa: (empresa) => {
    empresas.push({ id: empresas.length + 1, ...empresa });
  }
};
