/* src/pages/Dashboard.js */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import EmpresaModal from '../components/EmpresaModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import './Dashboard.css';

const Dashboard = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [empresaToEdit, setEmpresaToEdit] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [empresaToDelete, setEmpresaToDelete] = useState(null);
  
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Cargar empresas
  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/empresas`);
      setEmpresas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener empresas:', error);
      toast.error('Error al cargar las empresas');
      setLoading(false);
    }
  };

  const handleOpenModal = (empresa = null) => {
    setEmpresaToEdit(empresa);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEmpresaToEdit(null);
  };

  const handleSaveEmpresa = async (empresaData) => {
    try {
      if (empresaToEdit) {
        // Actualizar empresa existente
        await axios.put(`${API_URL}/empresas/${empresaToEdit._id}`, empresaData);
        toast.success('Empresa actualizada con éxito');
      } else {
        // Crear nueva empresa
        await axios.post(`${API_URL}/empresas`, empresaData);
        toast.success('Empresa registrada con éxito');
      }
      fetchEmpresas();
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar empresa:', error);
      toast.error('Error al guardar la empresa');
    }
  };

  const handleDeleteClick = (empresa) => {
    setEmpresaToDelete(empresa);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URL}/empresas/${empresaToDelete._id}`);
      toast.success('Empresa eliminada con éxito');
      fetchEmpresas();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
      toast.error('Error al eliminar la empresa');
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setEmpresaToDelete(null);
  };

  const verIncidencias = (empresaId) => {
    navigate(`/incidencias/${empresaId}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Gestión de Empresas</h2>
        <button 
          className="btn-primary" 
          onClick={() => handleOpenModal()}
        >
          Registrar Empresa
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">Cargando...</div>
      ) : (
        <div className="table-container">
          {empresas.length === 0 ? (
            <div className="no-data">No hay empresas registradas. Comience registrando una nueva empresa.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>RIF/NIT</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empresas.map((empresa) => (
                  <tr key={empresa._id}>
                    <td>{empresa.nombre}</td>
                    <td>{empresa.identificacion}</td>
                    <td>{empresa.direccion}</td>
                    <td>{empresa.telefono}</td>
                    <td>{empresa.email}</td>
                    <td className="actions-cell">
                      <button 
                        className="btn-icon btn-view"
                        onClick={() => verIncidencias(empresa._id)}
                        title="Ver incidencias"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="btn-icon btn-edit"
                        onClick={() => handleOpenModal(empresa)}
                        title="Editar empresa"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteClick(empresa)}
                        title="Eliminar empresa"
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
        <EmpresaModal 
          empresa={empresaToEdit} 
          onClose={handleCloseModal} 
          onSave={handleSaveEmpresa} 
        />
      )}

      {deleteModalOpen && (
        <DeleteConfirmModal
          title="Eliminar Empresa"
          message={`¿Está seguro de eliminar la empresa ${empresaToDelete?.nombre}? Esta acción no se puede deshacer.`}
          onConfirm={handleDeleteConfirm}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;