import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);


const Payment = () => {
  return (
   <div>
    <Helmet>
        <title>Payment</title>
      </Helmet>
     <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
   </div>
  );
};

export default Payment;
