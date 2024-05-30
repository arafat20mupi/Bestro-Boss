import SectionTitle from "../Components/SectionTitle";
import {loadStripe} from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    ElementsConsumer,
  } from '@stripe/react-stripe-js';
// add publisable key
const stripePromise = loadStripe('')
const Payment = () => {
    return (
        <div>
            <SectionTitle heading={'payment'} subHeading={'Please pay to eat'}></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <PaymentForm></PaymentForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;