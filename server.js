// Importamos el modulo express 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// // drop the table if it already exists
 //db.sequelize.sync({ force: true }).then(() => {
  //console.log("Drop and re-sync db.");
//});

app.get("/", (req, res) => {
  res.json({ message: "Conexion Correcta" });
});

require("./app/routes/libro.routes")(app);
require("./app/routes/prestamo.routes")(app);
require("./app/routes/estudiante.routes")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});