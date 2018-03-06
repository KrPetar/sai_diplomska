var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://postgres@localhost:5432/sai_db');

var Doctor = sequelize.define('doctors', {
    doctor_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    ssn: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
});

sequelize.sync()
    .then(() => console.log('doctors table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = Doctor;