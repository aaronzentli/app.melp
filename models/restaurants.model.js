const {TE, to} = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Restaurants', {
    id: {type: DataTypes.STRING, primaryKey: true},
    rating: DataTypes.INTEGER,
    name: DataTypes.STRING,
    site: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  },{
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  });

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  Model.getRestaurantsInRadius = async function (latitude,longitude,radius) {
    let listRestaurants;

    listRestaurants = sequelize.query("SELECT COUNT(id) AS count, AVG(rating) AS avg, STD(rating) AS std FROM Restaurants WHERE (acos(sin(radians("+latitude+")) * sin(radians(lat)) + cos(radians("+latitude+")) * cos(radians(lat)) * cos(radians("+longitude+") - radians(lng))) * 6371) <="+radius+";");

    return listRestaurants; 
  }

  return Model;
};