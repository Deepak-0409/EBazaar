const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
class PaymentController {
    async paymentCheckout(req, res) {
        const { cart, id } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const cartData = cart.map(item => {
            return {
                _id: item._id,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                color: item.color,
            }
        });

        const customer = await stripe.customers.create({
            email: user.email,
            metadata: {
                orderData: JSON.stringify(cartData), 
            }
        })

        const session = await stripe.checkout.sessions.create({

            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'inr',
                        },
                        display_name: 'Free Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 2,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 5,
                            }
                        }
                    }
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 100 * 100,
                            currency: 'inr',
                        },
                        display_name: 'Express Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1,
                            },
                        },
                    },
                },
            ],
            line_items: cart.map(item => {
                const percentage = item.discount / 100;
                let discountPrice = item.price - item.price * percentage;
                discountPrice = parseFloat(discountPrice.toFixed(2));
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.title,
                        },
                        unit_amount: discountPrice * 100,
                    },
                    quantity: item.quantity,

                }
            }),
            customer: customer.id,
            mode: 'payment',
            success_url: `${process.env.CLIENT}/user?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT}/cart`,
        });

        res.json({ url: session.url });
    }
    async checkoutSession(request, response) {

        const sig = request.headers['stripe-signature'];
        let event;

        try {
            event = stripe.webhooks.constructEvent(request.rawBody, sig, process.env.STRIPE_ENDPOINT_SECRET);
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object;
                break;
            case 'checkout.session.async_payment_failed':
                const checkoutSessionAsyncPaymentFailed = event.data.object;
                break;
            case 'checkout.session.async_payment_succeeded':
                const checkoutSessionAsyncPaymentSucceeded = event.data.object;
                break;
            case 'checkout.session.completed':
                const data = event.data.object;
                const customer = await stripe.customers.retrieve(data.customer);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        response.send();
    }
}

module.exports = new PaymentController();