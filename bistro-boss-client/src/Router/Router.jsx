import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import Manu from "../Pages/Manu/Manu";
import Order from "../Pages/Order/Order";


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
            }
        ]
    },
]);



export default Router;