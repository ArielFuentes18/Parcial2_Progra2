const libroModel = require("./libro.model");

module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define("prestamo", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        libroId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estudianteId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha_prestamo: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        fecha_devolucion: {
            type: Sequelize.DATE,
            allowNull: false
        },
        disponible: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    });
    return Prestamo;
};