    // Importa el modelo de usuario
    import User from '../models/user.model.js';

    // Función para obtener todos los usuarios (tutores)
    export const obtenerUsuariosYColecciones = async (req, res) => {
    try {
        // Realizar la consulta para obtener todos los usuarios
        const tutores = await User.find({});
        res.status(200).json(tutores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };
