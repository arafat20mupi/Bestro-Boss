import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItems = () => {
    const { name, recipe, category, price, _id } = useLoaderData();
    const { register, handleSubmit } = useForm()
    // const axiosPublic = UseAxiosPublic()
    const axiosSecure = UseAxiosSecure()
    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = { image: data.image[0] }

        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        console.log(res.data);
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                image: res.data.data.display_url,
                price: parseFloat(data.price),
                recipe: data.recipe,


            }
            console.log(menuItem);
            const manuItems = await axiosSecure.patch(`/manu/${_id}`, menuItem);
            if (manuItems.data.modifiedCount > 0) {
                toast.success('Item updated successfully')
            }
        }
    }
    return (
        <div>
            <SectionTitle subHeading={'Refresh info'} heading={'Update An Item'}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            defaultValue={name}
                            {...register("name", { required: true })}
                            type="text" placeholder="Recipe Name"
                            className="input input-bordered w-full " />
                    </label>
                    <div className="flex gap-6">
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Select a cetegory*</span>
                            </div>
                            <select
                                {...register("category", { required: true })}
                                defaultValue={category}
                                className="select select-bordered w-full">
                                <option disabled value={'default'}>Select a cetegory </option>
                                <option value={'salad'}>Salad</option>
                                <option value={'pizza'}>Pizza</option>
                                <option value={'soup'}>Soup</option>
                                <option value={'dessert'}>Dessert</option>
                                <option value={'drinks'}>Drinks</option>
                            </select>
                        </label>
                        {/* ---- */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                defaultValue={price}
                                {...register("price", { required: true })}
                                type="text" placeholder="Price"
                                className="input input-bordered w-full " />
                        </label>

                    </div>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>
                        </div>
                        <textarea
                            defaultValue={recipe}
                            {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    </label>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Image*</span>
                        </div>
                        <input 
                            {...register("image", { required: true })}
                            type="file" className="file-input file-input-ghost w-full max-w-xs" />
                    </label>
                    <button className="btn">Update Items <FaUtensils></FaUtensils> </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItems;