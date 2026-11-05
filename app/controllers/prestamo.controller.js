const db = require('../models');
const Prestamo = db.Prestamo;
const Libro = db.Libro;
const Estudiante = db.Estudiante;

// 1. Asignar libro a estudiante (POST /prestamos)
exports.asignarPrestamo = async (req, res) => {
  const { libroId, estudianteId } = req.body;

  // MEJORA: Validación de entrada
  if (!libroId || !estudianteId) {
    return res.status(400).json({ error: 'Debes proporcionar libroId y estudianteId' });
  }

  // MEJORA: Iniciamos una transacción para garantizar que ambas tablas se actualicen, o ninguna.
  const t = await db.sequelize.transaction();

  try {
    const estudiante = await Estudiante.findByPk(estudianteId, { transaction: t });
    if (!estudiante) {
      await t.rollback();
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const libro = await Libro.findByPk(libroId, { transaction: t });
    if (!libro) {
      await t.rollback();
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    if (!libro.disponible) {
      await t.rollback();
      return res.status(400).json({ error: 'El libro no está disponible actualmente para préstamo' });
    }

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 14);

    const prestamo = await Prestamo.create({ 
      libroId, 
      estudianteId,
      fecha_prestamo: new Date(), 
      fecha_devolucion: fechaLimite // Fecha en la que debería entregarlo
    }, { transaction: t });
    
    // Actualizar el estado del libro a "No disponible"
    await libro.update({ disponible: false }, { transaction: t });

    // Confirmamos los cambios en la BD
    await t.commit();

    res.status(201).json({ mensaje: 'Préstamo registrado con éxito', prestamo });
  } catch (error) {
    // Si algo falla, deshacemos todo para evitar préstamos erróneos
    await t.rollback();
    res.status(500).json({ error: "Error al asignar el préstamo", detalle: error.message });
  }
};

// 2. Marcar libro como devuelto (PUT /prestamos/:id)
exports.devolverLibro = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const prestamo = await Prestamo.findByPk(req.params.id, { transaction: t });
    
    if (!prestamo) {
      await t.rollback();
      return res.status(404).json({ error: 'Registro de préstamo no encontrado' });
    }

    const libro = await Libro.findByPk(prestamo.libroId, { transaction: t });
    
    // CORRECCIÓN: Como asignamos una fecha límite arriba, fechaDevolucion ya no estará vacía.
    // La forma correcta de saber si ya fue devuelto es verificar si el libro ya está disponible.
    if (libro && libro.disponible) {
      await t.rollback();
      return res.status(400).json({ error: 'Este libro ya fue devuelto y registrado' });
    }

    // Actualizamos a la fecha real en la que el estudiante lo trajo (hoy)
  await prestamo.update({ fecha_devolucion: new Date() }, { transaction: t });

    // Volver a hacer disponible el libro
    if (libro) {
      await libro.update({ disponible: true }, { transaction: t });
    }

    await t.commit();
    res.status(200).json({ mensaje: 'Libro devuelto con éxito', prestamo });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: "Error al registrar la devolución", detalle: error.message });
  }
};

// 3. MEJORA SUGERIDA: Obtener el historial completo de préstamos
exports.obtenerHistorialPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll({
      include: [
        { model: Libro, attributes: ['titulo', 'autor', 'disponible'] },
        { model: Estudiante, attributes: ['nombre', 'carnet'] }
      ]
    });
    res.status(200).json(prestamos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el historial", detalle: error.message });
  }
};