import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import logImg from '../../assets/others/authentication2.png'
import SocialLogin from '../../Components/SocialLogin';
import toast from 'react-hot-toast';
const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                toast.success("User Login Successfully");
                navigate(from, { replace: true });
            })
            .catch(() => {
                toast.error("User not login , please Register ");
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col-reverse md:flex-row">
                    <div className="text-center flex-1 md:w-1/2 lg:text-left">
                        <img src={logImg} alt="" />
                    </div>
                    <div className="card flex-1 md:w-1/2 max-w-lg shadow-2xl bg-white ">
                        <form onSubmit={handleLogin} className="card-body flex-1">
                            <div className='w-full max-w-md p-8 space-y-3 rounded-xl border bg-white font-sans mx-auto'>
                                <h1 className="text-3xl font-bold text-center text-indigo-600">Please Login</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <div className='w-full'>
                                        <LoadCanvasTemplate />
                                    </div>
                                    <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring" required />

                                </div>
                                <div className="form-control mt-6">
                                    <button disabled={disabled} type="submit" className="text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
                                        Sign in an account
                                        
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="flex items-center  space-x-2">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <p className="text-sm text-gray-600">Sign in with social accounts</p>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        <div className=' '>
                            <SocialLogin ></SocialLogin>
                        </div>

                        <p className="text-sm my-2 text-center gap-2 flex justify-center sm:px-6">
                            I Have No Account !
                            <Link to={"/register"} className="underline hover:text-indigo-600">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;