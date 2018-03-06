var Sequelize = require('sequelize');
var Patient = require('./patient');

var sequelize = new Sequelize('postgres://postgres@localhost:5432/sai_db');

var Diagnosis = sequelize.define('diagnoses', {
    diagnosis_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    patient_id: {
        type: Sequelize.INTEGER
    },
    diagnosis: {
        type: Sequelize.TEXT
    },
    diagnosis_time: {
        type: Sequelize.DATE
    }
}, {
    classMethods: {
        associate: function(Patient) {
            Diagnosis.belongsTo(Patient);
        }
    },
    timestamps: false
});

sequelize.sync()
    .then(() => console.log('diagnoses table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = Diagnosis;