    // Importa el modelo de usuario
    import Tutor from '../models/user.model.js';
    import Menor from '../models/menor.model.js'; // Importa el modelo de menor
    import Ruta from '../models/task.model.js';   // Importa el modelo de menor
    import Publicacion from '../models/publicacion.js'; // Importa el modelo Publicacion
    import { v4 as uuidv4 } from 'uuid';
    import bcrypt from 'bcryptjs';

    

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

    export const obtenerMenorPorId = async (req, res) => {
      try {
          const menor = await Menor.findById(req.params.id);
          if (!menor) return res.status(404).json({ message: "Menor no encontrado" });
          res.json(menor);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
      }
  };
  export const creartutor = async (req, res) => {
    // Extraer datos del cuerpo de la solicitud
    const { username, email, password, tipoIdentificacion, numerodeIdentificacion, telefono, nombres, apellidos } = req.body;

    try {
        // Verificar si el correo electrónico ya está en uso
        const existingTutor = await Tutor.findOne({ email });
        if (existingTutor) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado" });
        }

        // Generar hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear un nuevo tutor con los datos proporcionados
        const newTutor = new Tutor({
            username,
            email,
            password: passwordHash,
            tipoIdentificacion,
            numerodeIdentificacion,
            telefono,
            nombres,
            apellidos
        });

        // Guardar el nuevo tutor en la base de datos
        const savedTutor = await newTutor.save();

        // Devolver una respuesta de éxito con el tutor creado
        res.status(201).json(savedTutor);
    } catch (error) {
        // Manejar errores y enviar una respuesta de error al cliente
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
  export const obtenerTutorPorId = async (req, res) => {
    try {
        const tutor = await  Tutor.findById(req.params.id);
        if (!tutor) return res.status(404).json({ message: "Tutor no encontrado" });
        res.json(tutor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const actualizarTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tutor) return res.status(404).json({ message: "Tutor no encontrado" });
    res.json(tutor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const eliminarTutor = async (req, res) => {
  try {
      const tutor = await Tutor.findByIdAndDelete(req.params.id);
      if (!tutor) return res.status(404).json({ message: "Tutor no encontrado" });
      res.json({ message: "Tutor eliminado correctamente" }); // Envía un mensaje indicando que el menor ha sido eliminado
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

    // Función para obtener todos los menores
   export const obtenerMenores = async (req, res) => {
    try {
      const menores = await Menor.find({});
      res.status(200).json(menores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };


   export const crearMenor = async (req, res) => {
    try {
      const { nombres, apellidos, tipoIdentificacion, numeroIdentificacion, edad, telefono, correo } = req.body;
  
      const newMenor = new Menor({
        tutor: req.user.id, // Asocia el menor con el tutor actual
        nombres,
        apellidos,
        tipoIdentificacion,
        numeroIdentificacion,
        edad,
        telefono,
        correo,
      });
  
      const savedMenor = await newMenor.save();
      res.status(201).json(savedMenor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  // Función para actualizar un menor existente
  export const actualizarMenor = async (req, res) => {
    try {
      const menor = await Menor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!menor) return res.status(404).json({ message: "Menor no encontrado" });
      res.json(menor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  // Función para eliminar un menor existente
  export const eliminarMenor = async (req, res) => {
    try {
        const menor = await Menor.findByIdAndDelete(req.params.id);
        if (!menor) return res.status(404).json({ message: "Menor no encontrado" });
        res.json({ message: "Menor eliminado correctamente" }); // Envía un mensaje indicando que el menor ha sido eliminado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};













    // Función para obtener todos los rutas
    export const obtenerRutas = async (req, res) => {
        try {
          const rutas = await Ruta.find({});
          res.status(200).json(rutas);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
       };

       export const obtenerRutaPorId = async (req, res) => {
      try {
          const ruta = await  Ruta.findById(req.params.id);
          if (!ruta) return res.status(404).json({ message: "Ruta no encontrado" });
          res.json(ruta);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
      }
  };

  export const actualizarRuta = async (req, res) => {
    try {
      const ruta = await Ruta.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!ruta) return res.status(404).json({ message: "Ruta no encontrado" });
      res.json(ruta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const eliminarRuta = async (req, res) => {
    try {
        const ruta = await Ruta.findByIdAndDelete(req.params.id);
        if (!ruta) return res.status(404).json({ message: "Ruta no encontrado" });
        res.json({ message: "Ruta eliminado correctamente" }); // Envía un mensaje indicando que el menor ha sido eliminado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const crearRuta = async (req, res) => {
  const { fechaRuta, puntoSalida, geosalida, puntoLlegada, geollegada, tiempoEstimado, estado, medioTransporte } = req.body;

  try {
    const newRuta = new Ruta({
      codigoMenor: uuidv4(),
      tutor: req.user.id,  // Asignamos el ID del usuario actual como el tutor de la ruta
      fechaRuta,
      puntoSalida,
      puntoLlegada,
      geosalida,
      geollegada,
      tiempoEstimado,
      estado,
      medioTransporte,
      user: req.user.id,
    });

    const savedRuta = await newRuta.save();
    res.status(201).json(savedRuta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la ruta", error });
  }
};


    // Función para obtener todas las publicaciones
    export const obtenerPublicaciones = async (req, res) => {
        try {
        // Realizar la consulta para obtener todas las publicaciones
        const publicaciones = await Publicacion.find({});
        res.status(200).json(publicaciones);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
       };

       

       
  
       export const obtenerpublicacionesPorId = async (req, res) => {
        try {
            const publicacion = await  Publicacion.findById(req.params.id);
            if (!publicacion) return res.status(404).json({ message: "publicacion no encontrado" });
            res.json(publicacion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
  
    export const actualizarPublicacion = async (req, res) => {
      try {
        const publicacion = await Publicacion.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        if (!publicacion) return res.status(404).json({ message: "Publicacion no encontrado" });
        res.json(publicacion);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  
    export const eliminarPublicacion = async (req, res) => {
      try {
          const publicacion = await Publicacion.findByIdAndDelete(req.params.id);
          if (!publicacion) return res.status(404).json({ message: "Publicacion no encontrado" });
          res.json({ message: "publicacion eliminado correctamente" }); // Envía un mensaje indicando que el menor ha sido eliminado
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
      }
  };
  
  export const crearPublicacion = async (req, res) => {
    try {
      const { menor, fechaPublicacion, foto, numeroContacto  } = req.body;
  
      const nuevaPublicacion = new Publicacion({
        menor,
        fechaPublicacion: fechaPublicacion || Date.now(),
        foto,
        numeroContacto,
      });
  
      const resultado = await nuevaPublicacion.save();
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  };