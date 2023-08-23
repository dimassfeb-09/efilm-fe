import {Link} from "react-router-dom";

export default function AdminNavBar() {
    return <div className="p-6">
        <div className="text-3xl font-bold">Menu</div>
        <div className="flex gap-3 mt-3">
            <div className="px-2 py-1 border rounded-md">
                <Link to={'/admin/home'}>Home</Link>
            </div>
            <div className="px-2 py-1 border rounded-md">
                <Link to={'/admin/movie'}>Movie</Link>
            </div>
            <div className="px-2 py-1 border rounded-md">
                <Link to={'/admin/genre'}>Genre</Link>
            </div>
            <div className="px-2 py-1 border rounded-md">Directors</div>
        </div>
    </div>;
}
