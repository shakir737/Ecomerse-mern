import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import {  FaPaypal } from "react-icons/fa";
import axios from "axios";

const CheckoutForm = ({price, cart, users }) => {

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setcardError] = useState('');
  const [clientSecret, setClientSecret] = useState("");


  const navigate = useNavigate();

 

  useEffect(() => {
    console.log(price);
    console.log(cart);
    if (typeof price !== 'number' || price < 1) {
      console.error('Invalid price value. Must be a number greater than or equal to 1.');
      return;
    }
  
     axios.post('http://localhost:3000/create-payment-intent', { price })
      .then(res => {

        setClientSecret(res.data.clientSecret);
      })
  }, [price]);

  // handleSubmit btn click
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

     if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet. Make sure to disable
      return;
     }

     const card = elements.getElement(CardElement);

     if (card == null) {
       return;
    }

    // // console.log('card: ', card)
      const {error, paymentMethod} = await stripe.createPaymentMethod({
       type: 'card',
       card,
    });

    if (error) {
     
      setcardError(error.message);
     } else {
       setcardError('Success!');
       // console.log('[PaymentMethod]', paymentMethod);
     }

     const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
        card: card,
        billing_details: {
          name:  users.getaUser.firstname,
          email: users.getaUser.email,
       },
     },
   },
  );

     if(confirmError){
      console.log(confirmError)
     }

    

     if(paymentIntent.status ==="succeeded") {
      const transitionId = paymentIntent.id;
      console.log(transitionId);
      setcardError(`Your transitionId is: ${transitionId}`)
      
      
    //   // save payment info to server
       const paymentInfo ={email: users.getaUser.email, transitionId: paymentIntent.id, price: price, quantity: cart.length,
         status: "order pending", orderDetail: cart, orderby: users.getaUser._id}
        
      // send payment info
        axios.post('http://localhost:3000/api/orders/create-order', {paymentInfo})
        .then( res => {
        if(res.data){
           alert('Payment info sent successfully!')
           navigate('/order')
        }
       })
    }


  };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      <div className="md:w-1/2 space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items:  {cart.length}</p>
      </div>
      <div className={`md:w-1/3 w-full border space-y-5  card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 `}>
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
       { stripe && (
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm mt-5 w-full"
        >
          Pay
        </button>
        </form>
       )}
      {cardError ? <p className="text-red text-xs italic">{cardError}</p> : ''}
     
      <div className="mt-5 text-center">
      <hr />
      <button
          type="submit"
    
          className="btn  btn-sm mt-5 bg-orange-500 text-white"
        >
         Pay with Paypal
        </button>
      </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
