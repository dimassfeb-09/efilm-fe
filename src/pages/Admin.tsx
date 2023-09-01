import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

enum NavActive {
    Movie = "Movie",
    Genre = "Genre",
    Director = "Director",
    Actor = "Actor",
}

export default function AdminNavBar() {

    const [currentActive, setCurrentActive] = useState<NavActive>(NavActive.Movie);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path === "/admin/genre") {
            setCurrentActive(NavActive.Genre);
        } else if (path === "/admin/director") {
            setCurrentActive(NavActive.Director);
        } else if (path === "/admin/actor") {
            setCurrentActive(NavActive.Actor);
        }
    }, [location]);

    return <div className="p-6">
        <div className="text-3xl font-bold">Menu</div>
        <div className="flex gap-3 mt-3">
            <Link to={'/admin/movie'} className={`px-2 py-1 border rounded-md ${currentActive == NavActive.Movie ? 'bg-black text-white' : 'bg-white text-black'}`}>Movie</Link>
            <Link to={'/admin/genre'} className={`px-2 py-1 border rounded-md ${currentActive == NavActive.Genre ? 'bg-black text-white' : 'bg-white text-black'}`}>Genre</Link>
            <Link to={'/admin/director'} className={`px-2 py-1 border rounded-md ${currentActive == NavActive.Director ? 'bg-black text-white' : 'bg-white text-black'}`}>Director</Link>
            <Link to={'/admin/actor'} className={`px-2 py-1 border rounded-md ${currentActive == NavActive.Actor ? 'bg-black text-white' : 'bg-white text-black'}`}>Actor</Link>
        </div>
    </div>;
}
