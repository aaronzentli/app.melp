const express = require('express');
const multer = require('multer');
const router = express.Router();
const RestaurantsController = require('../controllers/restaurants.controller');

let upload = multer({dest: 'tmp/csv/'});
/* Página de información de la API. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Melp Restaurant API", data:{"version_number":"v1.0.0"}})
});

//Cargar csv
router.post('/import-restaurants', upload.single('csv'), RestaurantsController.importcsv);

//Crear
router.post( '/restaurants', RestaurantsController.create);

//Lectura de todos los restaurantes
router.get( '/restaurants', RestaurantsController.getAll);

//Lectura de todos los restaurantes en un radio
router.get( '/restaurants/statistics', RestaurantsController.statistics);

//Lectura de restaurante por id
router.get( '/restaurants/:restaurant_id', RestaurantsController.get);

//Actualiza restaurante
router.put( '/restaurants/:restaurant_id', RestaurantsController.update);

//Borra un restaurante
router.delete( '/restaurants/:restaurant_id',  RestaurantsController.remove);

module.exports = router;
