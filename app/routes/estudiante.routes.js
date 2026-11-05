module.exports = app => {
    const estudiantes = require("../controllers/estudiante.controller.js"); // Ajusta el nombre si es distinto
    var router = require("express").Router();

    // 1. Crear un nuevo estudiante (POST)
    router.post("/create/", estudiantes.crearEstudiante);

    // 2. Obtener todos los estudiantes (GET)
    router.get("/", estudiantes.obtenerEstudiantes);

    // 6. Consultar libros prestados a un estudiante (GET)
    // Usamos una ruta específica para traer los préstamos según el ID del estudiante
    router.get("/prestamos/:id", estudiantes.obtenerPrestamosDeEstudiante);

    // 3. Obtener un estudiante por ID (GET_ID)
    router.get("/:id", estudiantes.obtenerEstudiantePorId);

    // 4. Actualizar un estudiante (PUT)
    router.put("/update/:id", estudiantes.actualizarEstudiante);

    // 5. Eliminar un estudiante (DELETE)
    router.delete("/delete/:id", estudiantes.eliminarEstudiante);
    app.use("/api/estudiantes", router);
};