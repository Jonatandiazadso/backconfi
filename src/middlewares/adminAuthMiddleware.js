import jwt from 'jsonwebtoken';
import { ADMIN_TOKEN_SECRET } from '../config.js';

export const adminAuthRequired = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.headers.authorization;

    if (!token) {
        console.log('No token found');
        return res.status(400).json({ message: 'No token, authorization denied' });
    }
    
    // Imprimir el token recibido
    console.log('Token:', token);

    // Verificar y decodificar el token
    jwt.verify(token.split(' ')[1], ADMIN_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('Invalid token:', err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
