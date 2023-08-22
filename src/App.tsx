import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Actors from "./pages/Actors.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import NavBar from "./components/NavBar.tsx";
import MovieDetail from "./pages/MoviesDetail.tsx";
import Admin from "./pages/Admin.tsx";
import AdminMovie from "./pages/AdminMovie.tsx";
import Genres from "./pages/Genres.tsx";

const App = () => {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movies/:id" element={<MovieDetail/>}/>
                <Route path="/genres/:id" element={<Genres/>}/>
                <Route path="/actors" element={<Actors/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/admin/home" element={<Admin/>}/>
                <Route path="/admin/movie" element={<AdminMovie/>}/>
            </Routes>
        </>
    );
};

export default App;