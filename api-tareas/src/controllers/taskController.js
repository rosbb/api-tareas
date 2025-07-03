const { Task } = require('../models');

// Crear tarea
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Obtener todas las tareas (admin ve todas, user solo las suyas)
exports.getTasks = async (req, res, next) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.findAll();
    } else {
      tasks = await Task.findAll({ where: { userId: req.user.id } });
    }
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Obtener una tarea por id
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    // Solo admin o dueño puede ver
    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Actualizar tarea
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    // Solo admin o dueño puede editar
    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const { title, description, completed } = req.body;
    await task.update({ title, description, completed });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Eliminar tarea
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    // Solo admin o dueño puede eliminar
    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await task.destroy();
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    next(err);
  }
};