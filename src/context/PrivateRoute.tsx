import {Navigate} from 'react-router-dom';
import {ReactNode} from "react";

const PrivateRoute = ({ isAuthenticated, redirectTo, children}: {isAuthenticated: boolean, redirectTo: string, children: ReactNode}) => {
    return isAuthenticated ? children : <Navigate to={redirectTo} replace/>;
};

export default  PrivateRoute;