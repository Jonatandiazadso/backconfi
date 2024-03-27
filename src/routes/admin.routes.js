import express from 'express';
 import {
   obtenerAdministradores,
   crearAdministrador,
  obtenerAdministradorPorId,
   actualizarAdministradorPorId,
   eliminarAdministradorPorId,
   iniciarSesionAdmin ,
   logoutAdmin,
  

} from '../controllers/admin.controller.js';
import {obtenerUsuariosYColecciones,} from '../controllers/admin.manager.controller.js'
 import { adminAuthRequired } from '../middlewares/adminAuthMiddleware.js';
const router = express.Router();

// Rutas para administradores
 router.get('/admins', obtenerAdministradores);
 router.post('/admins', crearAdministrador);
  router.get('/admins/admin/:id', obtenerAdministradorPorId);
  router.put('/admins/:id', actualizarAdministradorPorId);
  router.delete('/admins/:id', eliminarAdministradorPorId);
  router.post('/admins/login', iniciarSesionAdmin);
  router.post('/admins/logout',   logoutAdmin);
router.get('/admins/tutor',  adminAuthRequired, obtenerUsuariosYColecciones);


export default router;