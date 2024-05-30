import { FaEdit, FaTrashAlt, } from "react-icons/fa";
import SectionTitle from "../Components/SectionTitle";
import useManu from "../Hooks/UseManu";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [manu, , refetch] = useManu();
    const axiosSecure = UseAxiosSecure()

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/manu/${item._id}`)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: `${item.name} has been deleted`,
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
                refetch()
            }
        });
    }
    const handleUpdate = (item) => {

    }
    return (
        <div>
            <SectionTitle heading={'Manage all Items'} subHeading={'Hurry Up'}></SectionTitle>
            <h2 className="text-3xl font-bold">Total Price</h2>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manu.map((item, idx) => {
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
                                            <Link to={`/deshBoard/updateItem/${item._id}`}>
                                                <button
                                                    onClick={() => handleUpdate(item)}
                                                    className="btn btn-lg text-white bg-[#D1A054]"
                                                    aria-label={`Make  admin`}
                                                >
                                                    <FaEdit className="text-x text-white" />
                                                </button>
                                            </Link>
                                        </th>
                                        <th>
                                            <button onClick={() => handleDelete(item)} className="btn btn-lg bg-red-600"><FaTrashAlt className="text-xl text-white"></FaTrashAlt> </button>
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

export default ManageItems;