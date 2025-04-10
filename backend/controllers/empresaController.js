// controllers/empresaController.js
const Empresa = require('../models/empresaModel');
const Incidencia = require('../models/incidenciaModel');

// Obtener todas las empresas
exports.getAllEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.find().sort({ nombre: 1 });
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener las empresas',
      error: error.message
    });
  }
};

// Obtener empresa por ID
exports.getEmpresaById = async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    
    if (!empresa) {
      return res.status(404).json({
        status: 'error',
        message: 'Empresa no encontrada'
      });
    }
    
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener la empresa',
      error: error.message
    });
  }
};

// Crear nueva empresa
exports.createEmpresa = async (req, res) => {
  try {
    const nuevaEmpresa = await Empresa.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: nuevaEmpresa
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al crear la empresa',
      error: error.message
    });
  }
};

// Actualizar empresa
exports.updateEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!empresa) {
      return res.status(404).json({
        status: 'error',
        message: 'Empresa no encontrada'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: empresa
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al actualizar la empresa',
      error: error.message
    });
  }
};

// Eliminar empresa
exports.deleteEmpresa = async (req, res) => {
  try {
    // Buscar empresa
    const empresa = await Empresa.findById(req.params.id);
    
    if (!empresa) {
      return res.status(404).json({
        status: 'error',
        message: 'Empresa no encontrada'
      });
    }
    
    // Verificar si tiene incidencias relacionadas
    const incidenciasRelacionadas = await Incidencia.countDocuments({ empresa: req.params.id });
    
    if (incidenciasRelacionadas > 0) {
      // Eliminar incidencias relacionadas primero
      await Incidencia.deleteMany({ empresa: req.params.id });
    }
    
    // Eliminar la empresa
    await Empresa.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      status: 'success',
      message: 'Empresa eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar la empresa',
      error: error.message
    });
  }
};