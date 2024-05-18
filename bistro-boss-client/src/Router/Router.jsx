import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>
    },
]);



export default Router;