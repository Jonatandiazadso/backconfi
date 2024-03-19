import Task from "../models/task.model.js";
import { json } from "express";
import { v4 as uuidv4 } from 'uuid';    

  // Se importa el modelo correcto
  export const getTasks = async (req, res) => {
    try {
      // Obtén el ID del tutor autenticado desde req.user.id
      const tutorId = req.user.id;
  
      // Busca solo las tareas creadas por el tutor actual
      const tasks = await Task.find({ tutor: tutorId });
  
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
export const createTask = async (req, res) => {
  const { fechaRuta, puntoSalida, geosalida, puntoLlegada, geollegada, tiempoEstimado, estado, medioTransporte } = req.body;

  try {
    const newTask = new Task({
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

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};