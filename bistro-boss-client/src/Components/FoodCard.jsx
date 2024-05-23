import UseAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseCart from "../Hooks/UseCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = UseAuth();
    const navigate = useNavigate
    const axiosSecure = UseAxiosSecure();
    const [ , refetch] = UseCart()

    const handleAddToCart = () => {
        if (user && user?.email) {
            const cartItem = {
                manuId: _id,
                email: user.email,
                name,
                image,
                price,
            }
            console.log('Adding item to cart:', cartItem);
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-right",
                            icon: "success",
                            title: `${name} added to cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart 
                        refetch();
                    }
                })

        }
        else {
            Swal.fire({
                title: "You Are Not Logged In",
                text: "Please Login to add to the Cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log In"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="">
                    <img src={image} alt="Shoes" className="rounded-xl" />
                </figure>
                <p className="absolute right-0 mr-4 mt-4 bg-slate-900 rounded-lg py-1 text-white px-4">${price}</p>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions">
                        <button onClick={handleAddToCart} className="btn  bg-slate-100 btn-outline border-0 border-orange-400 border-b-4">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;