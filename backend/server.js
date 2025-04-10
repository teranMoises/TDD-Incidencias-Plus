// Estructura de archivos

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const empresaRoutes = require('./routes/empresaRoutes');
const incidenciaRoutes = require('./routes/incidenciaRoutes');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/empresas', empresaRoutes);
app.use('/api/incidencias', incidenciaRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('API de Sistema de Gestión de Incidencias');
});

// Conexión a MongoDB y arranque del servidor
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Conexión a MongoDB establecida');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
  });