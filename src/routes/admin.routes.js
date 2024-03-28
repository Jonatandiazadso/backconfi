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
//RUTAS PARA PARA TUTORES
import {obtenerUsuariosYColecciones,actualizarTutor,eliminarTutor,obtenerTutorPorId,creartutor, crearPublicacion} from '../controllers/admin.manager.controller.js'

 //RUTAS PARA MENORES
import {obtenerMenores,crearMenor,actualizarMenor,eliminarMenor,obtenerMenorPorId} from '../controllers/admin.manager.controller.js'

//RUTAS PARA RUTAS
import {obtenerRutas,obtenerRutaPorId,actualizarRuta,eliminarRuta,crearRuta} from '../controllers/admin.manager.controller.js'

//RUTAS PARA PUBLICACIONES
import {obtenerPublicaciones,obtenerpublicacionesPorId,actualizarPublicacion,eliminarPublicacion} from '../controllers/admin.manager.controller.js'


import { adminAuthRequired } from '../middlewares/adminAuthMiddleware.js';
const router = express.Router();

// Rutas para administradores
 router.get('/admins', obtenerAdministradores);
 router.post('/admins', crearAdministrador);
 router.get('/admins/admin/:id', obtenerAdministradorPorId);
 router.put('/admins/admin/:id', actualizarAdministradorPorId);
 router.delete('/admins/:id', eliminarAdministradorPorId);
 
 //RUTAS PARA LOGIN-LOGUT
 router.post('/admins/login', iniciarSesionAdmin);
 router.post('/admins/logout', logoutAdmin);
 
 //RUTAS PARA PARA TUTORES
 router.get('/admins/tutor',  adminAuthRequired, obtenerUsuariosYColecciones);
 router.get('/admins/tutor/:id',  adminAuthRequired, obtenerTutorPorId);
 router.put('/admins/tutor/:id',  adminAuthRequired, actualizarTutor);
 router.delete('/admins/tutor/:id',  adminAuthRequired, eliminarTutor);
 router.post('/admins/tutor',  adminAuthRequired, creartutor);
 
 //RUTAS PARA MENORES
 
 router.get('/admins/menor',  adminAuthRequired, obtenerMenores);
 router.get('/admins/menor/:id',  adminAuthRequired, obtenerMenorPorId);
 router.post('/admins/menor',  adminAuthRequired, crearMenor);
 router.put('/admins/menor/:id',  adminAuthRequired, actualizarMenor);
 router.delete('/admins/menor/:id',  adminAuthRequired, eliminarMenor);

 //RUTAS PARA RUTAS
 router.get('/admins/rutas',  adminAuthRequired, obtenerRutas);
 router.post('/admins/rutas',  adminAuthRequired, crearRuta);
 router.get('/admins/rutas/:id',  adminAuthRequired, obtenerRutaPorId);
 router.put('/admins/rutas/:id',  adminAuthRequired, actualizarRuta);
 router.delete('/admins/rutas/:id',  adminAuthRequired, eliminarRuta);
 //RUTAS PARA PUBLICACIONES
 router.get('/admins/publicaciones',  adminAuthRequired, obtenerPublicaciones );
 router.get('/admins/publicaciones/:id',  adminAuthRequired, obtenerpublicacionesPorId);
 router.put('/admins/publicaciones/:id',  adminAuthRequired, actualizarPublicacion);
 router.delete('/admins/publicaciones/:id',  adminAuthRequired, eliminarPublicacion);
 router.post('/admins/publicaciones',  adminAuthRequired, crearPublicacion);
export default router;