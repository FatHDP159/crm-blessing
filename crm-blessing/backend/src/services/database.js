// ===== EMPRESAS =====
let empresas = [
  { id: 1, nombre: "Empresa Alpha", ruc: "20111111111" },
  { id: 2, nombre: "Empresa Beta", ruc: "20222222222" }
];

// ===== USUARIOS =====
let usuarios = [
  { id: 1, email: "asesor@erp.com", password: "1234", role: "asesor" },
  { id: 2, email: "supervisor@erp.com", password: "1234", role: "supervisor" }
];

module.exports = {
  // Empresas
  getEmpresas: () => empresas,
  addEmpresa: (empresa) => {
    empresas.push({ id: empresas.length + 1, ...empresa });
  },

  // Usuarios
  getUserByEmail: (email) =>
    usuarios.find(user => user.email === email)
};