const db = require('../models');
const Libro = db.Libro;
const { Op } = require("sequelize");

// 1. Crear un nuevo libro (POST)
exports.crearLibro = async (req, res) => {
  try {
    const libro = await Libro.create({
      titulo: req.body.titulo,
      autor: req.body.autor,
      fecha_publicacion: req.body.fecha_publicacion,
      genero: req.body.genero,
      // Si no se envía el estado de disponibilidad, por defecto será true
      disponible: req.body.disponible !== undefined ? req.body.disponible : true 
    });
    res.status(201).json(libro);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el libro", error: error.message });
  }
};

// 2. Obtener todos los libros (GET_ALL)
exports.obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los libros", error: error.message });
  }
};

// 3. Obtener un libro por ID (GET_ID)
exports.obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el libro", error: error.message });
  }
};

// 4. Actualizar un libro (PUT)
exports.actualizarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }
    
    // update() automáticamente reemplaza los campos que vengan en req.body
    await libro.update(req.body);
    res.status(200).json({ mensaje: "Libro actualizado con éxito", libro });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el libro", error: error.message });
  }
};

// 5. Eliminar un libro (DELETE)
exports.eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }
    
    await libro.destroy();
    res.status(200).json({ mensaje: "Libro eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el libro", error: error.message });
  }
};

// 6. Buscar libro por título (GET)
exports.buscarLibroPorTitulo = async (req, res) => {
  try {
    // Tomamos el título de los parámetros de consulta (query params), ej: /libros/buscar?titulo=anillos
    const { titulo } = req.query; 

    if (!titulo) {
      return res.status(400).json({ mensaje: "Debe proporcionar un parámetro 'titulo' para la búsqueda" });
    }

    const libros = await Libro.findAll({
      where: {
        titulo: {
          // Op.iLike es ideal para PostgreSQL, hace la búsqueda sin importar mayúsculas/minúsculas
          [Op.iLike]: `%${titulo}%` 
        }
      }
    });

    if (libros.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron libros con ese título" });
    }

    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar el libro", error: error.message });
  }
};