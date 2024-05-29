import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    if (!authContext) {
        // If AuthContext is null, you can handle it gracefully
        return <Navigate to="/login" />;
    }

    const { user, loading } = authContext;

    if (loading) {
        return <progress className="progress w-56"></progress>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;
