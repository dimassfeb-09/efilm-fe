import {Link} from "react-router-dom";

export default function AdminNavBar() {


    return <div className="p-6">
        <div className="text-3xl font-bold">Menu</div>
        <div className="flex gap-3 mt-3">
            <Link to={'/admin/home'} className="px-2 py-1 border rounded-md">Home</Link>
            <Link to={'/admin/movie'} className="px-2 py-1 border rounded-md">Movie</Link>
            <Link to={'/admin/genre'} className="px-2 py-1 border rounded-md">Genre</Link>
            <Link to={'/admin/director'} className="px-2 py-1 border rounded-md">Director</Link>
            <Link to={'/admin/actor'} className="px-2 py-1 border rounded-md">Actor</Link>
        </div>
    </div>;
}
