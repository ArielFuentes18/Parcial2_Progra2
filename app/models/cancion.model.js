module.exports = (sequelize, Sequelize) => {
    const Cancion = sequelize.define("cancion", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        nombre: {
            type: Sequelize.STRING,
        },
        descripcion: {
            type: Sequelize.STRING,
        },
        artista: {
            type: Sequelize.STRING,
        },
        duracion: {
            type: Sequelize.INTEGER,
        },
        extencion: {
            type: Sequelize.STRING,
        },
        album: {
            type: Sequelize.STRING,
        },
        ano_lanzamiento: {
            type: Sequelize.DATE,

        },
        carnet : {
            type: Sequelize.STRING,
        }

    });
    return Cancion;
};