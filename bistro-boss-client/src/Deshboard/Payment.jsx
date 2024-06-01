import SectionTitle from "../Components/SectionTitle";
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import PaymentForm from "./Components/PaymentForm";
// add publisable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
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