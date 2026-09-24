const db = require('../models');
const Cancion = db.Cancion;
const { Op } = require("sequelize");

//Crear canción 
exports.crearCancion = async (req, res) => {
  try {
    const canción = await Cancion.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      artista: req.body.artista,
      duracion: req.body.duracion,
      extencion: req.body.extencion,
      album: req.body.album,
      año_lanzamiento: req.body.año_lanzamiento,
      carnet: req.body.carnet
    });
    res.status(201).json(canción);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la canción", error: error.message });
  }
};

// Obtener todas las canciones 
exports.obtenerCanciones = async (req, res) => {
  try {
    const canciones = await Cancion.findAll();
    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las canciones", error: error.message });
  }
};

// Buscar canción por nombre
exports.buscarCancionPorNombre = async (req, res) => {
  try {
    
    const { nombre } = req.query; 

    if (!nombre) {
      return res.status(400).json({ mensaje: "Debe proporcionar un parámetro 'nombre' para la búsqueda" });
    }

    const canciones = await Cancion.findAll({
      where: {
        nombre: {
          // Op.iLike es ideal para PostgreSQL, hace la búsqueda sin importar mayúsculas/minúsculas
          [Op.iLike]: `%${nombre}%` 
        }
      }
    });

    if (canciones.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron canciones con ese nombre" });
    }

    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar la canción", error: error.message });
  }
};

//Actualizar una canción 
exports.actualizarCancion = async (req, res) => {
  try {
    const canción = await Cancion.findByPk(req.params.id);
    if (!canción) {
      return res.status(404).json({ mensaje: "Canción no encontrada" });
    }
    
    await canción.update(req.body);
    res.status(200).json({ mensaje: "Canción actualizada con éxito", canción });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la canción", error: error.message });
  }
};

//Eliminar una canción (DELETE)
exports.eliminarCancion = async (req, res) => {
  try {
    const canción = await Cancion.findByPk(req.params.id);
    if (!canción) {
      return res.status(404).json({ mensaje: "Canción no encontrada" });
    }
    
    await canción.destroy();
    res.status(200).json({ mensaje: "Canción eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la canción", error: error.message });
  }
};
