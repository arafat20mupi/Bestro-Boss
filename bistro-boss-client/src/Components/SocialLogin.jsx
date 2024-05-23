import { FaGoogle } from "react-icons/fa";
import UseAuth from "../Hooks/UseAuth";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { reset } = useForm();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = UseAxiosPublic()

    console.log(from);
    const { googleSignIn } = UseAuth();
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(( result ) => {
            console.log(result.user);
            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email,
            }
            axiosPublic.post("/users", userInfo)
            .then((res) => {
                 console.log(res);
                 toast.success("User Registered Successfully");
                 navigate(from || "/");
             })
        })
    }
    return (
        <div className="px-12">
            <button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="flex btn rounded-3xl items-center justify-center w-full ">
            <FaGoogle></FaGoogle> Continue To Google 
            </button>
        </div>
    );
};

export default SocialLogin;