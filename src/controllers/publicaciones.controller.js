

import Publicacion from "../models/publicacion.js";


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

export const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find().populate('menor');
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const getPublicacionById = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id).populate('menor');
    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }
    res.status(200).json(publicacion);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const actualizarPublicacion = async (req, res) => {
  try {
    const publicacionActualizada = await Publicacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!publicacionActualizada) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }
    res.status(200).json(publicacionActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const eliminarPublicacion = async (req, res) => {
  try {
    const publicacionEliminada = await Publicacion.findByIdAndDelete(req.params.id);
    if (!publicacionEliminada) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }
    res.status(200).json({ mensaje: 'Publicación eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};


