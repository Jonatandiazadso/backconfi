import express from 'express';
import {
  obtenerAdministradores,
  crearAdministrador,
  obtenerAdministradorPorId,
  actualizarAdministradorPorId,
  eliminarAdministradorPorId,
} from '../controllers/admin.controller.js';

const router = express.Router();

// Rutas para administradores
router.get('/admins', obtenerAdministradores);
router.post('/admins', crearAdministrador);
router.get('/admins/:id', obtenerAdministradorPorId);
router.put('/admins/:id', actualizarAdministradorPorId);
router.delete('/admins/:id', eliminarAdministradorPorId);

export default router;