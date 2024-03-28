 import { AdminModel } from "../models/admin.model.js";
 import bcrypt from "bcrypt";  
 import jwt from 'jsonwebtoken'
 import User from '../models/user.model.js';
 import { ADMIN_TOKEN_SECRET } from '../config.js';

 // Obtener todos los administradores
 export const obtenerAdministradores = async (req, res) => {
   try {
     const usuarios = await User.find({}); // Buscar todos los documentos en la colección de usuarios
     res.json(usuarios); // Devolver los usuarios encontrados como respuesta
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error interno del servidor' });
   }
 };

 // Crear un nuevo administrador
 export const crearAdministrador = async (req, res) => {
     const { nombres, apellidos, email, password } = req.body;
  
     try {
       const passwordHash = await bcrypt.hash(password, 10);
      
       const nuevoAdmin = new AdminModel({
         nombres,
         apellidos,
         email,
         password: passwordHash,
       });
  
       const adminGuardado = await nuevoAdmin.save();
       res.status(201).json(adminGuardado);
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Error interno del servidor' });
     }
   };

 // Obtener un administrador por su ID
 export const obtenerAdministradorPorId = async (req, res) => {
   try {
     const admin = await AdminModel.findById(req.params.id); // Utiliza el modelo AdminModel en lugar de User
     if (!admin) return res.status(404).json({ message: 'Administrador no encontrado' });
     res.json(admin);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error interno del servidor' });
   }
 };

 // Actualizar un administrador por su ID
 export const actualizarAdministradorPorId = async (req, res) => {
  try {
     const admin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
     if (!admin) return res.status(404).json({ message: 'Administrador no encontrado' });
     res.json(admin);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error interno del servidor' });
   }
 };

 // Eliminar un administrador por su ID
 export const eliminarAdministradorPorId = async (req, res) => {
  try {
     const admin = await AdminModel.findByIdAndDelete(req.params.id);
     if (!admin) return res.status(404).json({ message: 'Administrador no encontrado' });
     res.json(admin);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error interno del servidor' });
   }
 };


 export const iniciarSesionAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Buscar al admin por su correo electrónico
      const admin = await AdminModel.findOne({ email });

      // Verificar si el admin existe y si la contraseña es válida
      if (!admin || !await bcrypt.compare(password, admin.password)) {
          return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      // Generar el token de autenticación con el formato "Bearer <token>"
      const token = jwt.sign({ id: admin._id }, ADMIN_TOKEN_SECRET, { expiresIn: '1h' });

      // Devolver el token y los datos del admin
      res.json({ token: `Bearer ${token}`, admin });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};

 export const logoutAdmin = (req, res) => {
   // Simplemente respondemos con un código 200 OK, ya que no hay acción adicional en el servidor
   res.status(200).json({ message: "Logout exitoso" });
 };






