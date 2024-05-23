import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';

const UseCart = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const { data: cart = [] , refetch } = useQuery({
        queryKey: ['cart' , user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/carts?email=${user?.email}`);
            return response.data;
        },
    })
    return [cart , refetch ];
};

export default UseCart;
