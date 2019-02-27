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

// Permitir acceso desde fuera
app.use(cors());

// Rutas de la app para la versión 1
app.use('/v1', v1);

// Ruta por default
app.use('/', function(req, res){
	res.statusCode = 200;
	res.json({status:"success", message:"Melp Restaurant API", data:{}})
});

// Tratar errores 
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

process.on('unhandledRejection', error => {
    console.error('Error', pe(error));
});