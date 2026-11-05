const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,     
  dialect: dbConfig.dialect,    
  dialectOptions: {
    ssl: {
      require: true,              
      rejectUnauthorized: false  
    }
  },
  pool: {
    max: dbConfig.pool.max,      
    min: dbConfig.pool.min,       
    acquire: dbConfig.pool.acquire, 
    idle: dbConfig.pool.idle     
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 1. Instanciar los modelos con los nombres correctos del dominio (Biblioteca)
db.Estudiante = require("./estudiante.model.js")(sequelize, Sequelize);
db.Libro = require("./libro.model.js")(sequelize, Sequelize);
db.Prestamo = require("./prestamo.model.js")(sequelize, Sequelize);

// 2. Definir las relaciones usando los objetos instanciados en "db"
db.Libro.belongsToMany(db.Estudiante, { through: db.Prestamo, foreignKey: 'libroId' });
db.Estudiante.belongsToMany(db.Libro, { through: db.Prestamo, foreignKey: 'estudianteId' });

// Relaciones 1 a Muchos para facilitar consultas con "include"
db.Prestamo.belongsTo(db.Libro, { foreignKey: 'libroId' });
db.Prestamo.belongsTo(db.Estudiante, { foreignKey: 'estudianteId' });
db.Libro.hasMany(db.Prestamo, { foreignKey: 'libroId' });
db.Estudiante.hasMany(db.Prestamo, { foreignKey: 'estudianteId' });

// 3. Exportar el objeto completo al final
module.exports = db;