import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

// Registro de un nuevo usuario
export const register = async (req, res) => {
    const { email, password, username, tipoIdentificacion, numerodeIdentificacion, telefono, nombres, apellidos } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            tipoIdentificacion,
            numerodeIdentificacion,
            telefono,
            nombres,
            apellidos
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            tipoIdentificacion: userSaved.tipoIdentificacion,
            numerodeIdentificacion: userSaved.numerodeIdentificacion,
            telefono: userSaved.telefono,
            nombres: userSaved.nombres,
            apellidos: userSaved.apellidos,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Inicio de sesión de usuario existente
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            tipoIdentificacion: userFound.tipoIdentificacion,
            numerodeIdentificacion: userFound.numerodeIdentificacion,
            telefono: userFound.telefono,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            token:token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cierre de sesión de usuario
export const logout = (req, res) => {
    res.clearCookie('token'); // Elimina la cookie que contiene el token
    return res.status(200).json({ message: 'Sesión cerrada exitosamente' }); // Envía un mensaje de sesión cerrada
};


// Obtener perfil de usuario
export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if (!userFound) return res.status(400).json({ message: "User not found" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            tipoIdentificacion: userFound.tipoIdentificacion,
            numerodeIdentificacion: userFound.numerodeIdentificacion,
            telefono: userFound.telefono,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/////////////////////////////////////////////////////////////////////

export const usuarios = async (req, res) => {
    try {
        //const userFound = await User.findById(req.user.id);

        if (!userFound) return res.status(400).json({ message: "User not found" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            tipoIdentificacion: userFound.tipoIdentificacion,
            numerodeIdentificacion: userFound.numerodeIdentificacion,
            telefono: userFound.telefono,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};