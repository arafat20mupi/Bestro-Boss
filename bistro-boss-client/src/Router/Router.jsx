import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import Manu from "../Pages/Manu/Manu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import Carts from "../Deshboard/Carts/Carts";
import Dashboard from "../Layouts/Dashboard";
import Contact from "../Pages/Contact/Contact";


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
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'cart',
                element: <Carts></Carts>
            }
        ]
    }
]);



export default Router;