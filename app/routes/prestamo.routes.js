module.exports = app => {
    const prestamos = require("../controllers/prestamo.controller.js"); 
    var router = require("express").Router();

    // 1. Asignar libro a estudiante (POST /api/prestamos/create)
    router.post("/create/", prestamos.asignarPrestamo);

    // 2. Marcar libro como devuelto (PUT /api/prestamos/update/:id)
    router.put("/update/:id", prestamos.devolverLibro);

    // 3. (Mejora) Ver el historial de todos los préstamos (GET /api/prestamos/)
    router.get("/", prestamos.obtenerHistorialPrestamos);

    // Definición del prefijo de la URI
    app.use("/api/prestamos", router);
};