

const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

const stripe = require('stripe')(STRIPE_SECRET_KEY)

const createcheckOutsession = async(req,res)=>{
console.log("Hello ");

try {
   
    const customer = await stripe.customers.create({
        name: req.body.name,
        email: req.body.email,
    });

   
    const session = await stripe.checkout.sessions.create({
        customer: customer.id,
       
        line_items: [{
            price_data: {
                currency: 'usd', 
                product_data: {
                    name: 'Sample Product',
                },
                unit_amount: 5000, 
            },
            quantity: 1,
        }],
        mode: 'payment',
        payment_method_types: [ 
            'card'
        ],
        success_url: 'http://localhost:3000/success.html?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel.html',
    });

    // Send the session ID for testing in Postman
    res.status(200).send({ sessionId: session.id, url: session.url });

} catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }

}



module.exports = {
    createcheckOutsession
}