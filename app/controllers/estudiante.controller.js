const db = require('../models');
const Estudiante = db.Estudiante;
const Prestamo = db.Prestamo;
const Libro = db.Libro;
// 1. Crear un nuevo estudiante (POST)
exports.crearEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.create({
      nombre: req.body.nombre,
      carnet: req.body.carnet,
      correo: req.body.correo
    });
    res.status(201).json(estudiante);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el estudiante", error: error.message });
  }
};

// 2. Obtener todos los estudiantes (GET)
exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los estudiantes", error: error.message });
  }
};

// 3. Obtener un estudiante por ID (GET_ID)
exports.obtenerEstudiantePorId = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
    res.status(200).json(estudiante);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el estudiante", error: error.message });
  }
};

// 4. Actualizar un estudiante (PUT)
exports.actualizarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
    
    await estudiante.update(req.body);
    res.status(200).json({ mensaje: "Estudiante actualizado con éxito", estudiante });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el estudiante", error: error.message });
  }
};

// 5. Eliminar un estudiante (DELETE)
exports.eliminarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }
    
    await estudiante.destroy();
    res.status(200).json({ mensaje: "Estudiante eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el estudiante", error: error.message });
  }
};

// 6. Consultar libros prestados a un estudiante (Requisito funcional)
exports.obtenerPrestamosDeEstudiante = async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll({
      where: { estudianteId: req.params.id },
      include: [{
        model: Libro,
        attributes: ['id', 'titulo', 'autor', 'anioPublicacion', 'genero'] // Traemos los detalles del libro
      }]
    });
    
    if (!prestamos || prestamos.length === 0) {
      return res.status(404).json({ mensaje: "El estudiante no tiene préstamos registrados" });
    }
    
    res.status(200).json(prestamos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al consultar los préstamos", error: error.message });
  }
}