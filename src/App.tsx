import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Actors from "./pages/Actors.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import NavBar from "./components/NavBar.tsx";
import MovieDetail from "./pages/MoviesDetail.tsx";
import AdminMovie from "./pages/AdminMovie.tsx";
import Genres from "./pages/Genres.tsx";
import AdminGenre from "./pages/AdminGenre.tsx";
import AdminDirector from "./pages/AdminDirector.tsx";
import AdminActor from "./pages/AdminActor.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useAuth} from "./context/AuthContext.tsx";
import PrivateRoute from "./context/PrivateRoute.tsx";

const App = () => {

    const useAuths = useAuth();
    useAuths.login();
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/movies/:id" element={<MovieDetail/>}/>
                    <Route path="/genres/:id" element={<Genres/>}/>
                    <Route path="/actors" element={<Actors/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path={"/login"} element={<PrivateRoute isAuthenticated={!useAuths.isAuthenticated} redirectTo={"/admin/movie"}><Login/></PrivateRoute>}/>
                    <Route path={"/admin/genre"} element={<PrivateRoute isAuthenticated={useAuths.isAuthenticated} redirectTo={"/login"}><AdminGenre/></PrivateRoute>}/>
                    <Route path={"/admin/director"} element={<PrivateRoute isAuthenticated={useAuths.isAuthenticated} redirectTo={"/login"}><AdminDirector/></PrivateRoute>}/>
                    <Route path={"/admin/actor"} element={<PrivateRoute isAuthenticated={useAuths.isAuthenticated} redirectTo={"/login"}><AdminActor/></PrivateRoute>}/>
                    <Route path={"/admin/movie"} element={<PrivateRoute isAuthenticated={useAuths.isAuthenticated} redirectTo={"/login"}><AdminMovie/></PrivateRoute>}/>
                </Routes>
            </LocalizationProvider>
        </>
    );
};

export default App;