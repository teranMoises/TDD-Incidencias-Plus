/* src/components/IncidenciaModal.js */
import React, { useState, useEffect } from 'react';
import './Modal.css';

const IncidenciaModal = ({ incidencia, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    tipo: '',
    fechaHora: '',
    estado: 'Pendiente',
    prioridad: 'Media',
    posiblesCausas: '',
    afecta: '',
    descripcion: '',
    acciones: ''
  });

  const [viewMode, setViewMode] = useState(false);

  useEffect(() => {
    if (incidencia) {
      // Formatear fecha para input datetime-local
      let formattedDate = '';
      if (incidencia.fechaHora) {
        const date = new Date(incidencia.fechaHora);
        formattedDate = date.toISOString().slice(0, 16);
      } else {
        formattedDate = new Date().toISOString().slice(0, 16);
      }

      setFormData({
        tipo: incidencia.tipo || '',
        fechaHora: formattedDate,
        estado: incidencia.estado || 'Pendiente',
        prioridad: incidencia.prioridad || 'Media',
        posiblesCausas: incidencia.posiblesCausas || '',
        afecta: incidencia.afecta || '',
        descripcion: incidencia.descripcion || '',
        acciones: incidencia.acciones || ''
      });
      
      // Si estamos viendo detalles, iniciar en modo visualización
      setViewMode(true);
    } else {
      // Para nueva incidencia, establecer fecha actual
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 16);
      
      setFormData(prevState => ({
        ...prevState,
        fechaHora: formattedDate
      }));
    }
  }, [incidencia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-lg">
        <div className="modal-header">
          <h3>
            {incidencia 
              ? (viewMode ? 'Detalles de Incidencia' : 'Editar Incidencia') 
              : 'Registrar Incidencia'}
          </h3>
          <div className="modal-controls">
            {incidencia && (
              <button 
                type="button" 
                className="toggle-button" 
                onClick={toggleViewMode}
              >
                {viewMode ? 'Editar' : 'Ver Detalles'}
              </button>
            )}
            <button className="close-button" onClick={onClose}>×</button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipo">Tipo de Incidencia*</label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                disabled={viewMode}
              >
                <option value="">Seleccione un tipo</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Red">Red</option>
                <option value="Seguridad">Seguridad</option>
                <option value="Base de Datos">Base de Datos</option>
                <option value="Aplicación">Aplicación</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="fechaHora">Fecha y Hora*</label>
              <input
                type="datetime-local"
                id="fechaHora"
                name="fechaHora"
                value={formData.fechaHora}
                onChange={handleChange}
                required
                disabled={viewMode}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="estado">Estado*</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                disabled={viewMode}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Resuelto">Resuelto</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="prioridad">Prioridad*</label>
              <select
                id="prioridad"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                required
                disabled={viewMode}
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="afecta">Afecta a*</label>
            <input
              type="text"
              id="afecta"
              name="afecta"
              value={formData.afecta}
              onChange={handleChange}
              placeholder="Área o sistema afectado por la incidencia"
              required
              disabled={viewMode}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="descripcion">Descripción de la Incidencia*</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              placeholder="Describa la incidencia en detalle"
              required
              disabled={viewMode}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="posiblesCausas">Posibles Causas</label>
            <textarea
              id="posiblesCausas"
              name="posiblesCausas"
              value={formData.posiblesCausas}
              onChange={handleChange}
              rows="2"
              placeholder="Describa las posibles causas de la incidencia"
              disabled={viewMode}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="acciones">Acciones Realizadas</label>
            <textarea
              id="acciones"
              name="acciones"
              value={formData.acciones}
              onChange={handleChange}
              rows="3"
              placeholder="Describa las acciones tomadas para resolver la incidencia"
              disabled={viewMode}
            ></textarea>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              {viewMode ? 'Cerrar' : 'Cancelar'}
            </button>
            {!viewMode && (
              <button type="submit" className="btn-primary">
                {incidencia ? 'Actualizar' : 'Guardar'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidenciaModal;