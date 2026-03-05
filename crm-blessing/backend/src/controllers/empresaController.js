
const db = require('../services/database');

exports.getEmpresas = (req, res) => {
  res.json(db.getEmpresas());
};

exports.createEmpresa = (req, res) => {
  db.addEmpresa(req.body);
  res.status(201).json({ message: "Empresa agregada" });
};
