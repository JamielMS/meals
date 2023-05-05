const User = require('./user.model');
const Restaurant = require('./restaurant.model');
const Meal = require('./meal.model');
const Order = require('./order.model');
const Review = require('./review.model');

const initModel = () => {
  User.hasMany(Review);
  Review.belongsTo(User);

  User.hasMany(Order);
  Order.belongsTo(User);
  
  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

};

module.exports = initModel;
