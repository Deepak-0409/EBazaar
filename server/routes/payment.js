const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const Authorization = require("../services/Authorization")
const router = express.Router();

router.post('/create-checkout-session', Authorization.authorized, PaymentController.paymentCheckout);
router.post('/webhook', Authorization.authorized, express.raw({type: 'application/json'}), PaymentController.checkoutSession);
router.get('/verify-payment/:id', Authorization.authorized, PaymentController.verifyPayment);
module.exports = router;