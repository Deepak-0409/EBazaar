const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const router = express.Router();

router.post('/create-checkout-session', PaymentController.paymentCheckout);
router.post('/webhook', express.raw({type: 'application/json'}), PaymentController.checkoutSession);
module.exports = router;