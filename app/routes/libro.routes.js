module.exports = app => {
    const libros = require("../controllers/libro.controller.js"); // Ajusta el nombre del archivo si es diferente
    var router = require("express").Router();

    // 1. Crear un nuevo libro (POST)
    router.post("/create/", libros.crearLibro);

    // 2. Obtener todos los libros (GET_ALL)
    router.get("/", libros.obtenerLibros);

    // 6. Buscar libro por título (GET)
    // NOTA: Es importante colocar las rutas estáticas como "/buscar" ANTES de las rutas con parámetros dinámicos como "/:id" 
    // para evitar que Express interprete "buscar" como si fuera un ID.
    router.get("/buscar", libros.buscarLibroPorTitulo);

    // 3. Obtener un libro por ID (GET_ID)
    router.get("/:id", libros.obtenerLibroPorId);

    // 4. Actualizar un libro (PUT)
    router.put("/update/:id", libros.actualizarLibro);

    // 5. Eliminar un libro (DELETE)
    router.delete("/delete/:id", libros.eliminarLibro);

    // Podemos utilizar como una ocpion app.use("EndPoint",router) para simplicar el URI
    // Ej.  http://localhost:Puerto/api/libros/
    app.use("/api/libros", router);
};