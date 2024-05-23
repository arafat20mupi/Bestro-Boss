import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import UseCart from "../../Hooks/UseCart";
const Navber = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const [cart] = UseCart()
    const handleLogOut = () => {
        logOut();
        toast.success('Successfully logout!')
    }
    return (
        <nav className="  opacity-80 text-white bg-black">
            <div className=" px-6 py-4 ">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <a href="/" className="btn bg-black text-white">
                            <h2 className="text-3xl  font-black ">BISTRO BOSS</h2>
                        </a>

                        <div className="flex lg:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                {!isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    < div className={`${isOpen ? 'block' : 'hidden'} lg:flex md:gap-5 lg:items-center uppercase lg:mx-8`}>
                        <NavLink to={"/"} className={({ isActive, isPending }) => isActive ? "active text-red-600 hover:underline" : isPending ? "pending " : "block px-3 py-2 mt-2 text-[#2FA0D9] transition-colors duration-300 transform rounded-md lg:mt-0   hover:bg-gray-100 dark:hover:bg-gray-700"}>Home</NavLink>
                        <NavLink to={"/manu"} className={({ isActive, isPending }) => isActive ? "active text-red-600 hover:underline" : isPending ? "pending " : "block px-3 py-2 mt-2 text-[#2FA0D9] transition-colors duration-300 transform rounded-md lg:mt-0   hover:bg-gray-100 dark:hover:bg-gray-700"}>Manu</NavLink>
                        <NavLink to={"/order/salad"} className={({ isActive, isPending }) => isActive ? "active text-red-600 hover:underline" : isPending ? "pending " : "block px-3 py-2 mt-2 text-[#2FA0D9] transition-colors duration-300 transform rounded-md lg:mt-0   hover:bg-gray-100 dark:hover:bg-gray-700"}>Our Shop</NavLink>
                        <NavLink to={"/deshBoard"} className={({ isActive, isPending }) => isActive ? "active text-red-600 hover:underline" : isPending ? "pending " : "block px-3 py-2 mt-2 text-[#2FA0D9] transition-colors duration-300 transform rounded-md lg:mt-0   hover:bg-gray-100 dark:hover:bg-gray-700"}>Deshboard</NavLink>
                        <NavLink to={"/deshBoard/cart"} className={({ isActive, isPending }) => isActive ? "active text-red-600 hover:underline" : isPending ? "pending " : "block px-3 py-2 mt-2 text-[#2FA0D9] transition-colors duration-300 transform rounded-md lg:mt-0   hover:bg-gray-100 dark:hover:bg-gray-700"}><button className="btn">
                           <FaShoppingCart/>
                            <div className="badge badge-secondary">+{cart.length}</div>
                        </button></NavLink>

                        <label className="swap swap-rotate">
                            <input type="checkbox" className="theme-controller" value='light' />
                            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>


                            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                        <div className="flex items-center mt-4 lg:mt-0">
                            {user ? (
                                <div className="flex gap-2 items-center">

                                    <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                        <img title={user?.displayName} src={user?.photoURL || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"} className="object-cover w-full h-full" alt="avatar" />
                                    </div>
                                    <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">{user?.displayName}</h3>
                                    <button onClick={() => handleLogOut()} className='btn btn-success text-white btn-sm'>Log Out</button>
                                </div>
                            ) : (
                                <Link to={"/login"} className='btn btn-accent btn-sm font-bold'>Log in</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Navber;