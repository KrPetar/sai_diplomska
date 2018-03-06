var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');

/**var Doctor = require('./models/doctor');
var Patient = require('./models/patient');
var Conversation = require('./models/conversation');
var Diagnosis = require('./models/diagnosis');
const { Pool, Client } = require('pg');**/

/**const client = new Client({
    user: 'dnedcxrd',
    host: 'postgres://dnedcxrd:nZpIazZQcyvxW5YmOVNH90g82jFWiCtH@horton.elephantsql.com:5432/dnedcxrd',
    database: 'dnedcxrd',
    password: 'nZpIazZQcyvxW5YmOVNH90g82jFWiCtH',
    port: 5432
});**/
/**const clinet = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'sai_db',
    password: '12345',
    port: 5432
});**/

dbDoctor = {
    doctor_id: 1,
    email: 'kr.petar5@gmail.com',
    password: '12345',
    first_name: 'Petar',
    last_name: 'Krstevski',
    ssn: '1012982450080'
};
dbPatients = [
    {
        patient_id: 1,
        doctor_id: 1,
        email: 'stefan.s@gmail.com',
        password: '12345',
        first_name: 'Stefan',
        last_name: 'Stefanovski',
        ssn: '0208992450350'
    },
    {
        patient_id: 2,
        doctor_id: 1,
        email: 'darko.d@gmail.com',
        password: '12345',
        first_name: 'Darko',
        last_name: 'Darkovski',
        ssn: '1912985450963'
    },
    {
        patient_id: 3,
        doctor_id: 1,
        email: 'angela.a@gmail.com',
        password: '12345',
        first_name: 'Angela',
        last_name: 'Angelovska',
        ssn: '0103990455145'
    }
];
dbConversations = [
    {
        conversation_id: 1,
        patient_id: 1,
        doctor_id: 1,
        comment: "My head hurts!",
        feedback: "Take this pills.",
        comment_time: "2018-03-05 09:18:33",
        feedback_time: "2018-03-05 09:18:33",
        patient_full_name: 'Stefan Stefanovski'
    },
    {
        conversation_id: 2,
        patient_id: 1,
        doctor_id: 1,
        comment: "My arm is hurting!",
        feedback: "Rest your arm for couple of days.",
        comment_time: "2018-03-05 09:33:03",
        feedback_time: "2018-03-05 11:40:06",
        patient_full_name: 'Stefan Stefanovski'
    },
    {
        conversation_id: 3,
        patient_id: 2,
        doctor_id: 1,
        comment: "I am not feeling well!",
        feedback: "Take a rest.",
        comment_time: "2018-03-05 09:18:33",
        feedback_time: "2018-03-05 09:32:02",
        patient_full_name: "Darko Darkovski"
    },
    {
        conversation_id: 4,
        patient_id: 2,
        doctor_id: 1,
        comment: "My right leg is injured!",
        comment_time: "2018-03-05 09:33:29",
        patient_full_name: "Darko Darkovski"
    },
    {
        conversation_id: 5,
        patient_id: 3,
        doctor_id: 1,
        comment: "I'm not feeling well!",
        feedback: "Take a rest.",
        comment_time: "2018-03-05 11:33:03",
        feedback_time: "2018-03-05 11:40:24",
        patient_full_name: "Angela Angelovska"
    },
    {
        conversation_id: 6,
        patient_id: 3,
        doctor_id: 1,
        comment: "I have a headache!",
        comment_time: "2018-03-05 09:18:33",
        patient_full_name: "Angela Angelovska"
    }
];
dbDiagnoses = [
    {
        diagnosis_id: 1,
        patient_id: 1,
        diagnosis: "Hypertension (HTN or HT), also known as high blood pressure (HBP), is a long-term medical condition in which the blood pressure in the arteries is persistently elevated. High blood pressure usually does not cause symptoms.",
        diagnosis_time: "2018-03-05 09:25:20"
    },
    {
        diagnosis_id: 2,
        patient_id: 1,
        diagnosis: "Back pain: Causes, symptoms, and treatments. ... Pain in the lower back may be linked to the bony lumbar spine, discs between the vertebrae, ligaments around the spine and discs, spinal cord and nerves, lower back muscles, abdomen and pelvic internal organs, and the skin around the lumbar area.",
        diagnosis_time: "2018-03-05 09:26:13"
    },
    {
        diagnosis_id: 3,
        patient_id: 2,
        diagnosis: "Diabetes is a chronic condition associated with abnormally high levels of sugar (glucose) in the blood. Insulin produced by the pancreas lowers blood glucose. Absence or insufficient production of insulin, or an inability of the body to properly use insulin causes diabetes.",
        diagnosis_time: "2018-03-05 09:27:26"
    },
    {
        diagnosis_id: 4,
        patient_id: 2,
        diagnosis: "Allergic rhinitis, also known as hay fever, is a type of inflammation in the nose which occurs when the immune system overreacts to allergens in the air. Signs and symptoms include a runny or stuffy nose, sneezing, red, itchy, and watery eyes, and swelling around the eyes. The fluid from the nose is usually clear.",
        diagnosis_time: "2018-03-05 09:28:05"
    },
    {
        diagnosis_id: 5,
        patient_id: 3,
        diagnosis: "Anxiety is a general term for several disorders that cause nervousness, fear, apprehension, and worrying. These disorders affect how we feel and behave and can cause physical symptoms.",
        diagnosis_time: "2018-03-05 09:29:37"
    }
];

var app = express();
var port = process.env.PORT || 8080;
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'OCNqVsjins',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1800000
    }
}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});
app.use(morgan('dev'));
app.use(express.static(__dirname + '//public'));
app.set('views', __dirname + '//views');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    if(req.session.user && req.cookies.user_sid && req.session.doctor) {
        res.redirect('/doctor');
    }
    else if(req.session.user && req.cookies.user_sid) {
        res.redirect('/patient');
    }
    else {
        res.redirect('/home');
    }
});

app.get('/home', (req, res) => {
    if(req.session.user && req.cookies.user_sid && req.session.doctor) {
        res.redirect('/doctor');
    }
    else if(req.session.user && req.cookies.user_sid) {
        res.redirect('/patient');
    }
    else {
        res.render('home.html');
    }
});

app.get('/login', (req, res) => {
    if(req.session.user && req.cookies.user_sid && req.session.doctor) {
        res.redirect('/doctor');
    }
    else if(req.session.user && req.cookies.user_sid) {
        res.redirect('/patient');
    }
    else {
        res.render('login.html');
    }
});

app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if(email == dbDoctor.email && password == dbDoctor.password) {
        req.session.user = dbDoctor;
        req.session.doctor = true;
        res.redirect('/doctor');
    }
    else {
        var flag = false;
        for(var i = 0; i < dbPatients.length; i++) {
            if(email == dbPatients[i].email && password == dbPatients[i].password) {
                req.session.user = dbPatients[i];
                flag = true;
                break;
            }
        }
        if(flag) {
            res.redirect('/patient');
        }
        else {
            res.redirect('/login');
        }
    }
    
    /**Doctor.findOne({ where: { email: email, password: password } }).then(function(doctor) {
        if(!doctor) {
            Patient.findOne({ where: { email: email, password: password } }).then(function(patient) {
                if(!patient) {
                    res.redirect('/login');
                }
                else {
                    req.session.user = patient.dataValues;
                    res.redirect('/patient');
                }
            });
        }
        else {
            req.session.user = doctor.dataValues;
            req.session.doctor = true;
            res.redirect('/doctor');
        }
    });**/
});

app.get('/doctor', (req, res) => {
    if(req.session.user && req.cookies.user_sid && req.session.doctor) {
        var patientsRes;
        var conversationsRes;

        patientsRes = dbPatients;
        conversationsRes = dbConversations;

        res.render('doctor.html', {
            user: req.session.user,
            patients: patientsRes,
            conversations: conversationsRes
        });

        /**Patient.findAll({ where: { doctor_id: Number(req.session.user.doctor_id) } }).then(function(patients) {
            if(patients) {
                patientsRes = patients;
            }
            else {
                patientsRes = [];
            }

            Conversation.findAll({ where: { doctor_id: Number(req.session.user.doctor_id) } }).then(function(conversations) {
                if(conversations) {
                    conversationsRes = conversations;
                }
                else {
                    conversationsRes = [];
                }

                res.render('doctor.html', {
                    user: req.session.user,
                    patients: patientsRes,
                    conversations: conversationsRes
                });
            });
        });**/
    }
    else {
        res.redirect('/login');
    }
});

app.post('/sendFeedback', (req, res) => {
    var conversation_id = Number(req.body.conversation_id);
    var feedback = req.body.feedback;

    dbConversations[conversation_id - 1].feedback = feedback;
    var date = new Date();
    dbConversations[conversation_id - 1].feedback_time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    
    res.redirect('/doctor');
    
    /**Conversation.findOne({ where: { conversation_id: Number(conversation_id) } }).then(function(conversation) {
        if(conversation) {
            conversation.updateAttributes({
                feedback: feedback
            })
            .done(function(err) {
                res.redirect('/doctor');
            });
        }
    });**/
});

app.get('/doctor/patientDiagnoses/:patient_id', (req, res) => {
    if(req.session.user && req.cookies.user_sid && req.session.doctor) {
        var patient_id = req.params.patient_id;
        var patientRes;
        var diagnosesRes = [];

        patientRes = dbPatients[patient_id - 1];
        for(var i = 0; i < dbDiagnoses.length; i++) {
            if(dbDiagnoses[i].patient_id == patient_id) {
                diagnosesRes.push(dbDiagnoses[i]);
            }
        }

        res.render('diagnoses.html', {
            user: req.session.user,
            patient: patientRes,
            diagnoses: diagnosesRes
        });

        /**Patient.findOne({ where: { patient_id: Number(patient_id), doctor_id: Number(req.session.user.doctor_id) } }).then(function(patient) {
            if(patient) {
                patientRes = patient;
                Diagnosis.findAll({ where: { patient_id: Number(patient_id) } }).then(function(diagnoses) {
                    if(diagnoses) {
                        diagnosesRes = diagnoses;
                    }
                    else {
                        diagnosesRes = [];
                    }

                    res.render('diagnoses.html', {
                        user: req.session.user,
                        patient: patientRes,
                        diagnoses: diagnosesRes
                    });
                });
            }
            else {
                res.redirect('/doctor');
            }
        });**/
    }
    else {
        res.redirect('/login');
    }
});

app.get('/patient', (req, res) => {
    if(req.session.user && req.cookies.user_sid) {
        var doctorRes;
        var conversationsRes = [];

        doctorRes = dbDoctor;
        for(var i = 0; i < dbConversations.length; i++) {
            if(dbConversations[i].patient_id == req.session.user.patient_id) {
                conversationsRes.push(dbConversations[i]);
            }
        }

        res.render('patient.html', {
            user: req.session.user,
            doctor: doctorRes,
            conversations: conversationsRes
        });

        /**Doctor.findOne({ where: { doctor_id: Number(req.session.user.doctor_id) } }).then(function(doctor) {
            if(doctor) {
                doctorRes = doctor;
            }
            else {
                doctorRes = [];
            }

            Conversation.findAll({ where: { patient_id: Number(req.session.user.patient_id) } }).then(function(conversations) {
                if(conversations) {
                    conversationsRes = conversations;
                }
                else {
                    conversationsRes = [];
                }
                res.render('patient.html', {
                    user: req.session.user,
                    doctor: doctorRes,
                    conversations: conversationsRes
                });
            });
        });**/
    }
    else {
        res.redirect('/login');
    }
});

app.post('/sendComment', (req, res) => {
    var comment = req.body.comment;
    var first_name = req.session.user.first_name;
    var last_name = req.session.user.last_name;
    var patient_full_name = first_name + ' ' + last_name;

    var date = new Date();
    comment_time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    dbConversations[dbConversations.length] = {
        conversation_id: dbConversations.length + 1,
        doctor_id: Number(req.session.user.doctor_id),
        patient_id: Number(req.session.user.patient_id),
        comment: comment,
        comment_time: comment_time,
        patient_full_name: patient_full_name
    };

    res.redirect('/patient');

    /**Conversation.create({
        doctor_id: Number(req.session.user.doctor_id),
        patient_id: Number(req.session.user.patient_id),
        comment: comment,
        patient_full_name: patient_full_name
    })
    .done(function(err) {
        res.redirect('/patient');
    });**/
});

app.get('/logout', (req, res) => {
    req.session.user = null;
    req.session.doctor = null;
    res.clearCookie('user_sid');
    res.redirect('/home');
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));