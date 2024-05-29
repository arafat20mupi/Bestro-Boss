import Swal from "sweetalert2";
import SectionTitle from "../Components/SectionTitle";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users` );
            return response.data;
        },
    });

    const handleAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500,
                        icon: "success"
                    });
                }
            })
    };

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
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The user has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };


    return (
        <div>
            <SectionTitle subHeading="How many??" heading="MANAGE ALL USERS" />
            <div>
                <h2 className="text-3xl uppercase font-bold text-black">Total users: {users.length}</h2>
                <table className="table mt-4">
                    <thead className="bg-[#D1A054] font-bold">
                        <tr>
                            <th className="py-6">#</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === "admin" ? "admin" : (
                                        <button
                                            onClick={() => handleAdmin(user)}
                                            className="btn btn-lg text-white bg-[#D1A054]"
                                            aria-label={`Make ${user.name} admin`}
                                        >
                                            <FaUsers className="text-xl" />
                                        </button>
                                    )}
                                </td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn text-white bg-red-500 btn-lg"
                                        aria-label={`Delete ${user.name}`}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
