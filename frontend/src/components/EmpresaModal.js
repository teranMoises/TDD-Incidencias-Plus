/* src/components/EmpresaModal.js */
import React, { useState, useEffect } from 'react';
import './Modal.css';

const EmpresaModal = ({ empresa, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    direccion: '',
    telefono: '',
    email: '',
    contacto: '',
    sector: ''
  });

  useEffect(() => {
    if (empresa) {
      setFormData({
        nombre: empresa.nombre || '',
        identificacion: empresa.identificacion || '',
        direccion: empresa.direccion || '',
        telefono: empresa.telefono || '',
        email: empresa.email || '',
        contacto: empresa.contacto || '',
        sector: empresa.sector || ''
      });
    }
  }, [empresa]);

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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{empresa ? 'Editar Empresa' : 'Registrar Empresa'}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre de la Empresa*</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="identificacion">RIF/NIT*</label>
            <input
              type="text"
              id="identificacion"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="direccion">Dirección*</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono*</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contacto">Persona de Contacto</label>
              <input
                type="text"
                id="contacto"
                name="contacto"
                value={formData.contacto}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="sector">Sector</label>
              <select
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
              >
                <option value="">Seleccione un sector</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Salud">Salud</option>
                <option value="Educación">Educación</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Manufactura">Manufactura</option>
                <option value="Comercio">Comercio</option>
                <option value="Servicios">Servicios</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {empresa ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpresaModal;