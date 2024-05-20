import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navber from "../Pages/Shared/Navber";

const Root = () => {
    return (
        <div>
            <Navber></Navber>

            <div className="">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;