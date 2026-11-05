module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define("libro", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        autor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha_publicacion: {
            type: Sequelize.DATE,
            allowNull: false
        },
        genero: {
            type: Sequelize.STRING,
            allowNull: false
        },
        disponible: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    });
    return Libro;
};