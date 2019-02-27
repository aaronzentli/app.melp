const { Restaurants } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const fs = require('fs');
const csv  = require('fast-csv');

//Importar CSV
const importcsv = async function(req, res){
    let file_info = req.file.path;
    let i = 0;
    let cabRow;
    let respuesta = [];
    csv.fromPath(file_info).on("data", async function (data) {
        let restaurant_row = {};
        if(i===0){
            cabRow = data;
        } else {
            for (let key = 0; key < data.length; key++) {
                if(cabRow[key]=='rating'){
                    restaurant_row[cabRow[key]] = parseInt( data[key] );
                } else if(cabRow[key]=='lat' || cabRow[key]=='lng') {
                    restaurant_row[cabRow[key]] = parseFloat( data[key] );
                } else {
                    restaurant_row[cabRow[key]] = data[key];
                }
            }
            let id = restaurant_row.id;
            delete restaurant_row['id'];
            [err, restaurant] = await to(Restaurants.findOrCreate({
                    where: {id: id}, 
                    defaults: restaurant_row
                })
            );
            if(err){
                respuesta[data['id']] = err;
            } 
        }
        i++;
    }).on("end", function () {
        fs.unlinkSync(file_info);
    });

    return ReS(res, {resumen: respuesta});
}
module.exports.importcsv = importcsv;

//CRUD
const create = async function(req, res){
    let restaurant_info = req.body;
    
    [err, restaurant] = await to(Restaurants.create(restaurant_info));
    if(err) return ReE(res, err, 422);

    return ReS(res, {restaurant:restaurant.toWeb()});
}
module.exports.create = create;

const getAll = async function(req, res){
    [err, listRestaurants] = await to(Restaurants.findAll({ attributes: [ 'rating', 'name', 'site', 'email', 'phone', 'street', 'city', 'state', 'lat', 'lng' ] }));

    let restaurants_json =[];
    for( let i in listRestaurants){
        let restaurants = listRestaurants[i];
        let restaurants_info = restaurants.toWeb();
        restaurants_json.push(restaurants_info);
    }

    return ReS(res, {restaurants:restaurants_json});
}
module.exports.getAll = getAll;

const statistics = async function(req, res){
    let err, listRestaurants,latitude,longitude,radius;
    latitude  = req.query.latitude;
    longitude = req.query.longitude;
    radius = req.query.radius;

    [err, listRestaurants] = await to(Restaurants.getRestaurantsInRadius(latitude,longitude,radius));

    return ReS(res, {restaurants:listRestaurants[0][0]});
}
module.exports.statistics = statistics;

const get = async function(req, res){
    let restaurant_id = req.params.restaurant_id;

    [err, restaurant] = await to(Restaurants.findOne({where: {id: restaurant_id},
    attributes: [ 'rating', 'name', 'site', 'email', 'phone', 'street', 'city', 'state', 'lat', 'lng' ] }));

    return ReS(res, {restaurant:restaurant.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let restaurant_id = req.params.restaurant_id;
    let data = req.body;

    [err, restaurant] = await to(Restaurants.update(data,{returning: true, where: {id: restaurant_id} }));
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {updated_restaurant:restaurant[1]});
}
module.exports.update = update;

const remove = async function(req, res){
    let restaurant_id = req.params.restaurant_id;

    [err, restaurant] = await to(Restaurants.destroy({where: {id: restaurant_id}}));
    if(err) return ReE(res, 'error occured trying to delete the restaurant');

    return ReS(res, {message:'Deleted Restaurant'});
}
module.exports.remove = remove;