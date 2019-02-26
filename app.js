const express 		= require('express');
const logger 	    = require('morgan');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const pe            = require('parse-error');
const cors          = require('cors');

const v1    = require('./routes/v1');
const app   = express();

const CONFIG = require('./config/config');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

//Log Entorno
console.log("Entorno:", CONFIG.app);

//Base de datos
const models = require("./models");
models.sequelize.authenticate().then(() => {
    console.log('conectando a la base de datos:', CONFIG.db_name);
})
.catch(err => {
    console.error('Error en la conexión a la base de datos:',CONFIG.db_name, err);
});
if(CONFIG.app==='dev'){
    models.sequelize.sync();
}

