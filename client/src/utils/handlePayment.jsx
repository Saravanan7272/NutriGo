export const handlePayment = async ({ amount, userInfo, onSuccess, onFailure }) => {
  if (!window.Razorpay) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    await new Promise(resolve => {
      script.onload = resolve;
    });
  }

  const options = {
     key:import.meta.env.VITE_RAZORPAY_KEY_ID,
  

    amount: amount * 100, 
    currency: "INR",
    name: "Food Ordering App",
    description: "Order Payment",
    handler: function (response) {
      console.log("Payment Success:", response);
      onSuccess(response);
    },
    prefill: {
      name: userInfo.name,
      email: "test@example.com",
      contact: userInfo.phone
    },
    theme: {
      color: "#F37254"
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.on('payment.failed', function (response) {
    console.error("Payment Failed:", response.error);
    if (onFailure) onFailure(response.error);
  });
  paymentObject.open();
};
