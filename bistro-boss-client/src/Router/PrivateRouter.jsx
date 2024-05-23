import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    
    if (loading) {
        return <progress className="prograss w-56"></progress>
    }
    if (user) {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} ></Navigate>
};

export default PrivateRouter;