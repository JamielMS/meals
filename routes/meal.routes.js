const express = require('express');

const {
  findAllMeals,
  findOneMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const validMeals = require('../middlewares/meal.middleware');
const validationCreate = require('../middlewares/validation.middleware');

const router = express.Router();

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin'));

router.get('/', findAllMeals);
router.get('/:id', validMeals.validIfExistMealPlusRestaurant, findOneMeal);

router
  .route('/:id')
  .post(validationCreate.createMealValidation, createMeal)
  .patch(validMeals.validIfExistMeal, updateMeal)
  .delete(validMeals.validIfExistMeal, deleteMeal);

module.exports = router;
