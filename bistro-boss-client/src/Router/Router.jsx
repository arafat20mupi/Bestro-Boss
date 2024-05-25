import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import Manu from "../Pages/Manu/Manu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import Dashboard from "../Layouts/Dashboard";
import Contact from "../Pages/Contact/Contact";
import PrivateRouter from "./PrivateRouter";
import AllUsers from "../Deshboard/AllUsers";
import Carts from "../Deshboard/Carts";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/manu",
                element: <Manu></Manu>
            },
            {
                path: "/order/:category",
                element: <Order></Order>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            }
            
        ]
    },
    {
        path: 'deshBoard',
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter> ,
        children: [
            {
                path: 'cart',
                element: <Carts></Carts>
            },
            {
                path: 'allUsers',
                element: <AllUsers></AllUsers>
            }
        ]
    }
]);



export default Router;