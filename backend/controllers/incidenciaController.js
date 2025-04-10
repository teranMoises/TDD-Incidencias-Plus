// controllers/incidenciaController.js
const Incidencia = require('../models/incidenciaModel');

// Obtener todas las incidencias
exports.getAllIncidencias = async (req, res) => {
  try {
    const incidencias = await Incidencia.find()
      .populate('empresa', 'nombre identificacion')
      .sort({ fechaHora: -1 });
    
    res.status(200).json(incidencias);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener las incidencias',
      error: error.message
    });
  }
};

// Obtener incidencia por ID
exports.getIncidenciaById = async (req, res) => {
  try {
    const incidencia = await Incidencia.findById(req.params.id)
      .populate('empresa', 'nombre identificacion');
    
    if (!incidencia) {
      return res.status(404).json({
        status: 'error',
        message: 'Incidencia no encontrada'
      });
    }
    
    res.status(200).json(incidencia);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener la incidencia',
      error: error.message
    });
  }
};

// Obtener incidencias por empresa
exports.getIncidenciasByEmpresa = async (req, res) => {
  try {
    const incidencias = await Incidencia.find({ 
      empresa: req.params.empresaId 
    }).sort({ fechaHora: -1 });
    
    res.status(200).json(incidencias);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener las incidencias de la empresa',
      error: error.message
    });
  }
};

// Crear nueva incidencia
exports.createIncidencia = async (req, res) => {
  try {
    const nuevaIncidencia = await Incidencia.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: nuevaIncidencia
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al crear la incidencia',
      error: error.message
    });
  }
};

// Actualizar incidencia
exports.updateIncidencia = async (req, res) => {
  try {
    const incidencia = await Incidencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!incidencia) {
      return res.status(404).json({
        status: 'error',
        message: 'Incidencia no encontrada'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: incidencia
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al actualizar la incidencia',
      error: error.message
    });
  }
};

// Eliminar incidencia
exports.deleteIncidencia = async (req, res) => {
  try {
    const incidencia = await Incidencia.findByIdAndDelete(req.params.id);
    
    if (!incidencia) {
      return res.status(404).json({
        status: 'error',
        message: 'Incidencia no encontrada'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Incidencia eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar la incidencia',
      error: error.message
    });
  }
};