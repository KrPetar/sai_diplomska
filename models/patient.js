var Sequelize = require('sequelize');
var Doctor = require('./doctor');

var sequelize = new Sequelize('postgres://postgres@localhost:5432/sai_db');

var Patient = sequelize.define('patients', {
    patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    doctor_id: {
        type: Sequelize.INTEGER
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
    classMethods: {
        associate: function(Doctor) {
            Patient.belongsTo(Doctor);
        }
    },
    timestamps: false
});

sequelize.sync()
    .then(() => console.log('patients table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = Patient;