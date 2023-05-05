const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const Meal = require('../models/meal.model');

const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');



exports.findAllOrderUser = catchAsync(async (req, res) => {
  const { sessionUser } = req;

  const order = await Order.findAll({
    where: {
      status: 'active',
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: order.length,
    order,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity} = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError('The meal not exist', 404));
  }

  const totalPriceOrder = meal.price * quantity;

  const order = await Order.create({
    quantity,
    mealId,
    userId: sessionUser.id,
    totalPrice: totalPriceOrder,
  });

  res.status(201).json({
    status: 'success',
    order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
  });
});

exports.deleteOrder = catchAsync(async (req, res) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
  });
});
