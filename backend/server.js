
const express = require('express');
const cors = require('cors');
const empresaRoutes = require('./src/routes/empresaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/empresas', empresaRoutes);

app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
