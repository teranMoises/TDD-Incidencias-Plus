// routes/incidenciaRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllIncidencias,
  getIncidenciaById,
  getIncidenciasByEmpresa,
  createIncidencia,
  updateIncidencia,
  deleteIncidencia
} = require('../controllers/incidenciaController');

router.get('/', getAllIncidencias);
router.get('/:id', getIncidenciaById);
router.get('/empresa/:empresaId', getIncidenciasByEmpresa);
router.post('/', createIncidencia);
router.put('/:id', updateIncidencia);
router.delete('/:id', deleteIncidencia);

module.exports = router;