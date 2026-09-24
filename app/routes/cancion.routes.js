module.exports = app => {
    const Cancion = require("../controllers/cancion.controller.js"); 
    var router = require("express").Router();

    router.post("/create/", Cancion.crearCancion);
    router.get("/", Cancion.obtenerCanciones);
    router.get("/buscar", Cancion.buscarCancionPorNombre);
    router.put("/update/:id", Cancion.actualizarCancion);
    router.delete("/delete/:id", Cancion.eliminarCancion);
    app.use("/api/canciones", router);
};