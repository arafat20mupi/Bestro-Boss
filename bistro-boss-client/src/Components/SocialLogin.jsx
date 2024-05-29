import { FaGoogle } from "react-icons/fa";
import UseAuth from "../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = UseAxiosPublic()

    const { googleSignIn } = UseAuth();
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(( result ) => {
            const userInfo = {
                name: result?.user?.displayName,
                email: result?.user?.email,
            }
            axiosPublic.post("/users", userInfo)
            .then(() => {
                 toast.success("User Registered Successfully");
                 navigate(from || "/");
             })
        })
    }
    return (
        <div className="px-12">
            <button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="flex btn bg-indigo-800 text-white mt-2 rounded-3xl items-center justify-center w-full ">
            <FaGoogle></FaGoogle> Continue To Google 
            </button>
        </div>
    );
};

export default SocialLogin;