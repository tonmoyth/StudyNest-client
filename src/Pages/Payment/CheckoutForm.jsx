import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./style.css";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: classData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["class-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  console.log(classData);

  const amount = parseInt(classData?.price);
  const amountCent = amount * 100;

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      const res = await axiosSecure.post("/create-payment-intent", {
        amountCent,
      });
      const clientSecret = res?.data?.clientSecret;

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.displayName,
              email: user?.email,
              phone: user?.phone,
            },
          },
        });

      if (confirmError) {
        console.log(confirmError.message);
        // setProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        // setSuccess("Payment Successful!");
        // Optionally store payment info to your DB here
        console.log('successfully')
      }
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <p className="bg-red-500">error</p>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-violet-700">
          Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" p-4 rounded-md shadow-inner bg-gray-50">
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
          </div>
          {/* {cardError && <p className="text-red-500 text-sm">{cardError}</p>} */}
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-primary w-full py-2 rounded-md"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
