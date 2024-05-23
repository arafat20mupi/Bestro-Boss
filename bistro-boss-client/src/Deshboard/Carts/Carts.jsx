import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../Components/SectionTitle";
import UseCart from "../../Hooks/UseCart";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Carts = () => {
    const [cart, refetch] = UseCart();
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
    const axoixSecure = UseAxiosSecure()
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axoixSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    return (
        <div className="">
            <SectionTitle
                subHeading={"My Cart"}
                heading={"WANNA ADD MORE?"}
            >
            </SectionTitle>
            <div className="flex justify-between">
                <h2 className="text-xl lg:text-3xl">Items: {cart.length}</h2>
                <h2 className="text-xl lg:text-3xl">Total Price: {totalPrice}</h2>
                <button className="btn btn-error">Pay</button>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, idx) => {
                                return (
                                    <tr key={item._id}>
                                        <th>
                                            {idx + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img className=" w-12 h-12 rounded-full" src={item.image} />
                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>{item.price}</td>
                                        <th>
                                            <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600"></FaTrashAlt> </button>
                                        </th>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Carts;