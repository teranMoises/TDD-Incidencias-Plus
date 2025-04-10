// models/incidenciaModel.js
const mongoose = require('mongoose');

const incidenciaSchema = new mongoose.Schema({
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: [true, 'La empresa es obligatoria']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo de incidencia es obligatorio'],
    trim: true
  },
  fechaHora: {
    type: Date,
    required: [true, 'La fecha y hora es obligatoria'],
    default: Date.now
  },
  estado: {
    type: String,
    required: [true, 'El estado es obligatorio'],
    enum: ['Pendiente', 'En Proceso', 'Resuelto'],
    default: 'Pendiente'
  },
  prioridad: {
    type: String,
    required: [true, 'La prioridad es obligatoria'],
    enum: ['Alta', 'Media', 'Baja'],
    default: 'Media'
  },
  posiblesCausas: {
    type: String,
    trim: true
  },
  afecta: {
    type: String,
    required: [true, 'El área o sistema afectado es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  acciones: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

module.exports = Incidencia;