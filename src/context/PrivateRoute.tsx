import {Navigate} from 'react-router-dom';
import {ReactNode, useState} from "react";
import LoadingPage from "../components/LoadingPage.tsx";

const PrivateRoute = ({ isAuthenticated, redirectTo, children}: {isAuthenticated: boolean, redirectTo: string, children: ReactNode}) => {

    const [loading, setLoading] = useState<boolean>(true);


    setTimeout(()=> {
        setLoading(false);
    }, 500);

    if (loading) {
        return LoadingPage();
    } else {
        return isAuthenticated ? children : <Navigate to={redirectTo} replace/>;
    }
};

export default  PrivateRoute;