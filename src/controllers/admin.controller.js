import { AdminModel } from "../models/admin.model.js";
import bcrypt from "bcrypt";  

// Obtener todos los administradores
export const obtenerAdministradores = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.json(admins);
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
    const admin = await AdminModel.findById(req.params.id);
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
