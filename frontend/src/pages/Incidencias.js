/* src/pages/Incidencias.js */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import IncidenciaModal from '../components/IncidenciaModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import './Incidencias.css';

const Incidencias = () => {
  const { empresaId } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [incidenciaToEdit, setIncidenciaToEdit] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [incidenciaToDelete, setIncidenciaToDelete] = useState(null);
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchData();
  }, [empresaId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Obtener detalles de la empresa
      const empresaResponse = await axios.get(`${API_URL}/empresas/${empresaId}`);
      setEmpresa(empresaResponse.data);
      
      // Obtener incidencias de la empresa
      const incidenciasResponse = await axios.get(`${API_URL}/incidencias/empresa/${empresaId}`);
      setIncidencias(incidenciasResponse.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      toast.error('Error al cargar los datos');
      setLoading(false);
    }
  };

  const handleOpenModal = (incidencia = null) => {
    setIncidenciaToEdit(incidencia);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIncidenciaToEdit(null);
  };

  const handleSaveIncidencia = async (incidenciaData) => {
    try {
      if (incidenciaToEdit) {
        // Actualizar incidencia existente
        await axios.put(`${API_URL}/incidencias/${incidenciaToEdit._id}`, incidenciaData);
        toast.success('Incidencia actualizada con éxito');
      } else {
        // Crear nueva incidencia
        const newIncidenciaData = {
          ...incidenciaData,
          empresa: empresaId
        };
        await axios.post(`${API_URL}/incidencias`, newIncidenciaData);
        toast.success('Incidencia registrada con éxito');
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar incidencia:', error);
      toast.error('Error al guardar la incidencia');
    }
  };

  const handleDeleteClick = (incidencia) => {
    setIncidenciaToDelete(incidencia);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URL}/incidencias/${incidenciaToDelete._id}`);
      toast.success('Incidencia eliminada con éxito');
      fetchData();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error al eliminar incidencia:', error);
      toast.error('Error al eliminar la incidencia');
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setIncidenciaToDelete(null);
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Función para obtener el color según prioridad
  const getPriorityColor = (prioridad) => {
    switch (prioridad.toLowerCase()) {
      case 'alta':
        return 'high-priority';
      case 'media':
        return 'medium-priority';
      case 'baja':
        return 'low-priority';
      default:
        return '';
    }
  };

  return (
    <div className="incidencias-container">
      <div className="incidencias-header">
        <div className="header-left">
          <Link to="/dashboard" className="back-link">
            <i className="fas fa-arrow-left"></i> Volver a Empresas
          </Link>
          <h2>
            {loading ? 'Cargando...' : `Incidencias de ${empresa?.nombre}`}
          </h2>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => handleOpenModal()}
        >
          Registrar Incidencia
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">Cargando...</div>
      ) : (
        <div className="table-container">
          {incidencias.length === 0 ? (
            <div className="no-data">No hay incidencias registradas para esta empresa.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                  <th>Afecta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {incidencias.map((incidencia) => (
                  <tr key={incidencia._id}>
                    <td>{formatDate(incidencia.fechaHora)}</td>
                    <td>{incidencia.tipo}</td>
                    <td>
                      <span className={`status-badge ${incidencia.estado.toLowerCase()}`}>
                        {incidencia.estado}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-badge ${getPriorityColor(incidencia.prioridad)}`}>
                        {incidencia.prioridad}
                      </span>
                    </td>
                    <td>{incidencia.afecta}</td>
                    <td className="actions-cell">
                      <button 
                        className="btn-icon btn-view"
                        onClick={() => handleOpenModal(incidencia)}
                        title="Ver detalles"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="btn-icon btn-edit"
                        onClick={() => handleOpenModal(incidencia)}
                        title="Editar incidencia"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteClick(incidencia)}
                        title="Eliminar incidencia"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {modalOpen && (
        <IncidenciaModal 
          incidencia={incidenciaToEdit} 
          onClose={handleCloseModal} 
          onSave={handleSaveIncidencia} 
        />
      )}

      {deleteModalOpen && (
        <DeleteConfirmModal
          title="Eliminar Incidencia"
          message="¿Está seguro de eliminar esta incidencia? Esta acción no se puede deshacer."
          onConfirm={handleDeleteConfirm}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Incidencias;