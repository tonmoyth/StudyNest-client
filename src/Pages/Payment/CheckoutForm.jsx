import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./style.css";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

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

  const { mutate: enrollStudent } = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await axiosSecure.post("/enroll", paymentInfo);
      return res.data;
    },
    onSuccess: () => {
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Payment successful!",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Payment failed",
        text: error.message || "Something went wrong",
      });
    },
  });

  const amount = parseInt(classData?.price);
  const amountCent = amount * 100;

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      // Step 1: Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Payment Method Error",
          text: error.message,
        });
        setLoading(false);
        return;
      }

      //  Get clientSecret from server
      const res = await axiosSecure.post("/create-payment-intent", {
        amountCent,
      });
      const clientSecret = res?.data?.clientSecret;

      //  Confirm payment
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
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: confirmError.message,
        });
        setLoading(false);
        return;
      }

      //  Payment success
      if (paymentIntent.status === "succeeded") {

        // Store payment info to DB here
        const paymentInfo = {
          name: user?.displayName,
          email: user?.email,
          phone: user?.phone || "N/A",
          amount: paymentIntent.amount / 100,
          transactionId: paymentIntent.id,
          classId: id,
          classTitle: classData.title,
          status: "paid",
          date: new Date(),
          method: paymentMethod.type,
        };

        enrollStudent(paymentInfo);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: err.message || "Something went wrong. Please try again.",
      });
      setLoading(false);
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
            disabled={!stripe || loading}
            className="btn btn-primary w-full py-2 rounded-md"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
