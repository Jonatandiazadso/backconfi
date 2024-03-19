import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// Ruta model
const rutaSchema = new mongoose.Schema({
        tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Se refiere al modelo User
        codigoMenor: { type: String, default: uuidv4, unique: true, required: true, trim: true },
        fechaRuta: { type: Date, default: Date.now, required: true },

        puntoSalida: { type: String, required: true },

        geosalida: {
            latitud: { type: String, required: true },
            longitud: { type: String, required: true },
        },
        puntoLlegada: { type: String, required: true },

        geollegada: {
            latitud: { type: String, required: true },
            longitud: { type: String, required: true },
        },

        tiempoEstimado: { type: Date, required: true },

        estado: { type: String, required: true },

        medioTransporte: { type: String, required: true },
    }, {
        timestamps: true
    });

export default mongoose.model('Ruta', rutaSchema);