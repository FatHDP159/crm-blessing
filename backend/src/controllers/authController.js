const db = require('../services/database');

exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = db.getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const { password: _, ...userWithoutPassword } = user;

  res.json(userWithoutPassword);
};