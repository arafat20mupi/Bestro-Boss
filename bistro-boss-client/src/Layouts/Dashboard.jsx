import {  FaBook, FaCalendar, FaHome, FaList, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet, } from "react-router-dom";
import { MdPayments, MdRateReview, MdEmail } from "react-icons/md";
import { RiMacbookFill } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import UseCart from "../Hooks/UseCart";
import UseAdmin from "../Hooks/UseAdmin";

const Dashboard = () => {
    const [cart] = UseCart();
    // get the is admin value from the database
    const [isAdmin] = UseAdmin()

    return (
        <div className="flex">
            <div className='w-64  min-h-screen bg-orange-400 '>
                <ul className="menu ">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to={'/deshBoard/adminHome'}>
                                    <FaHome></FaHome>
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/deshBoard/addItems'}>
                                    <FaUtensils />
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/deshBoard/manageItems'}>
                                    <FaList />
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/deshBoard/manageBookings'}>
                                    <FaBook></FaBook>
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/deshBoard/allUsers'}>
                                    <FaUsers></FaUsers>
                                    All Users
                                </NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to={'/deshBoard/userHome'}>
                                        <FaHome></FaHome>
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/deshBoard/reservation'}>
                                        <FaCalendar></FaCalendar>
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/deshBoard/payments'}>
                                        <MdPayments />
                                        payment history
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/deshBoard/cart'}>
                                        <FaShoppingCart></FaShoppingCart>
                                        MY Cart {cart.length}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/deshBoard/review'}>
                                        <MdRateReview />
                                        Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/deshBoard/myBookings'}>
                                        <RiMacbookFill />
                                        My Bookings
                                    </NavLink>
                                </li>
                            </>
                    }
                    {/*  page button */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/manu'}>
                            <FiMenu></FiMenu>
                            Manu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                            <FaShoppingBag></FaShoppingBag>
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/contact'}>
                            <MdEmail></MdEmail>
                            Contact
                        </NavLink>
                    </li>

                </ul>


            </div>
            <div className="w-full px-6 lg:px-16">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;