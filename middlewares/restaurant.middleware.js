const AppError = require('../helpers/appError');
const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
const catchAsync = require('../helpers/catchAsync');

exports.validIfExistRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${id} not found.`, 404));
  }
  req.restaurant = restaurant;
  next();
});

exports.validIfExistRestaurantWithReview = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
      where: {
        id,
        status: 'active',
      },
      include: [
        {
          model: Review,
        },
      ],
    });

    if (!restaurant) {
      return next(new AppError(`Restaurant with id: ${id} not found.`, 404));
    }
    req.restaurant = restaurant;
    next();
  }
);
