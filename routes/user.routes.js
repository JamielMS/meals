const express = require('express');

const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  findAllOrdersByUser,
  findOneOrderById,
} = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const Validations = require('../middlewares/validation.middleware');
const validOrders = require('../middlewares/order.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/signup', Validations.createUserValidation, createUser);
router.post('/login', loginUser);


router.get('/orders', findAllOrdersByUser);
router.get('/orders/:id', validOrders.validIfExistOrder, findOneOrderById);

router
  .route('/:id')
  .patch(
    userMiddleware.validIfExistUser,
    authMiddleware.protectAccountOwner,
    updateUser
  )
  .delete(
    userMiddleware.validIfExistUser,
    authMiddleware.protectAccountOwner,
    deleteUser
  );

module.exports = router;
