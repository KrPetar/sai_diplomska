var Sequelize = require('sequelize');
var Doctor = require('./doctor');
var Patient = require('./patient');

var sequelize = new Sequelize('postgres://postgres@localhost:5432/sai_db');

var Conversation = sequelize.define('conversations', {
    conversation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    patient_id: {
        type: Sequelize.INTEGER
    },
    doctor_id: {
        type: Sequelize.INTEGER
    },
    comment: {
        type: Sequelize.STRING
    },
    feedback: {
        type: Sequelize.STRING
    },
    comment_time: {
        type: Sequelize.DATE
    },
    feedback_time: {
        type: Sequelize.DATE
    },
    patient_full_name: {
        type:Sequelize.STRING
    }
}, {
    classMethods: {
        associate: function(Patient) {
            Conversation.belongsTo(Patient);
        },
        associate: function(Doctor) {
            Conversation.belongsTo(Doctor);
        }
    },
    timestamps: false
});

sequelize.sync()
    .then(() => console.log('conversations table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = Conversation;