import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import logImg from '../../assets/others/authentication2.png'
import { Helmet } from "react-helmet-async";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import SocialLogin from "../../Components/SocialLogin";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, googleSignIn, upDateProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);

    const onSubmit = (data) => {
        const { usernameOrEmail, password, fullName, photoURL } = data;
        const AxiosPublic = UseAxiosPublic()

        createUser(usernameOrEmail, password)
            .then(() => {
                upDateProfile(fullName, photoURL)
                    .then(() => {
                        const userInfo = {
                            email: usernameOrEmail,
                            photoURL: photoURL,
                        }
                        AxiosPublic.post('/users', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    console.log('object updated');
                                    toast.success("User created successfully")
                                    reset();
                                    navigate(location.state?.pathname || "/");
                                }
                            })

                        // if (result?.user) {

                        // }
                    })
            });
    };

    // const handleSocialLogin = (socialProvider) => {
    //     socialProvider()
    //         .then(result => {
    //             if (result?.user) {
    //                 toast.success('Successfully login!')
    //                 reset();
    //                 navigate(location?.state?.pathname || "/");
    //             }
    //         });
    // };

    const handleShowPassword = () => {
        setShow(!show);
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Bistro || Register</title>
            </Helmet>
            <div className="hero-content flex-col md:flex-row">
                <div className="card flex-1 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                        <div className="w-full max-w-md p-8 space-y-3 rounded-xl border bg-white font-sans mx-auto">
                            <h1 className="text-3xl font-bold text-center text-indigo-600">Create an account</h1>
                            <div className="space-y-2 text-sm">
                                <label htmlFor="fullName" className="block">
                                    Your Name
                                </label>
                                <input {...register("fullName", { required: true })} type="text" name="fullName" id="fullName" placeholder="Enter Your Name" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring" />
                                {errors.fullName && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="space-y-2 text-sm">
                                <label htmlFor="photoURL" className="block">
                                    photo URL
                                </label>
                                <input {...register("photoURL", { required: true })} type="text" name="photoURL" id="photoURL" placeholder="Enter Your Photo URL" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring" />
                                {errors.photoURL && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="space-y-2 text-sm">
                                <label htmlFor="usernameOrEmail" className="block">
                                    Username or Email
                                </label>
                                <input {...register("usernameOrEmail", { required: true })} type="email" name="usernameOrEmail" id="usernameOrEmail" placeholder="Username or Email" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring" />
                                {errors.usernameOrEmail && <span className="text-red-500">This field is required</span>}
                            </div>

                            <div className="space-y-2 text-sm">
                                <label htmlFor="password" className="block">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("password", {
                                            required: true,
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                        })}
                                        type={show ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                                    />
                                    <span className="absolute right-4 top-3" onClick={handleShowPassword}>{show ? <IoMdEyeOff className="text-xl" /> : <FaEye className="text-xl" />}</span>
                                </div>
                                {errors.password && errors.password.type === "required" && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                                {errors.password && errors.password.type === "pattern" && (
                                    <span className="text-red-500">
                                        Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long
                                    </span>
                                )}
                            </div>
                            <button type="submit" className="text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
                                Create an account
                                <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
                                    Let&apos;s go
                                </span>
                                <span className="bg-indigo-800 absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                                <span className="bg-indigo-800 absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                                <span className="bg-indigo-800 absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                                <span className="bg-indigo-800 absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                            </button>
                            <div className="flex items-center pt-4 space-x-2">
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <p className="text-sm text-gray-600">Create an account with social accounts</p>
                                <div className="flex-1 h-px bg-gray-300"></div>
                            </div>
                            <div className=' my-2 space-y-3'>
                                <SocialLogin ></SocialLogin>
                                <SocialLogin ></SocialLogin>
                            </div>
                            {/* <div className="flex justify-center space-x-4">
                                <button onClick={() => handleSocialLogin(googleSignIn)} aria-label="Log in with Google" className="p-3 rounded-full hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"><path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path></svg>
                                </button>
                                <div onClick={() => handleSocialLogin(googleSignIn)} className='text-2xl font-bold '>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"><path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path></svg>
                                </div>
                            </div> */}
                            <p className="text-sm text-center gap-2 flex justify-center sm:px-6">
                                Already have an account?
                                <Link to={"/login"} className="underline hover:text-indigo-600">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="text-center flex-1 md:w-1/2 lg:text-left">
                    <img src={logImg} alt="" />
                </div>
            </div>
        </div>

    );
};

export default Register;