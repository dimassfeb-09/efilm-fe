import {useState} from "react";
import {Menu} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import showToast from "./toast.tsx";
import {ToastContainer} from "react-toastify";

export default function NavBar() {

    const [menuHidden, setMenuHidden] = useState<boolean>(true);

    const [cookie, , removeCookie] = useCookies(['access_token'])

    const handleLogout = () => {
        removeCookie('access_token', {path: '/'})
        showToast(true, "Successfully logout");
    }

    return (
        <nav className="sticky top-0 z-50 bg-primaryColor text-white h-16 flex">
            <div className="menu__nav flex items-center w-full justify-between px-5">
                <Link to='/'>
                    <span className="text-2xl font-bold">
                  <span className="text-yellow-400">e</span>
                  <span className="text-pink-400">.Film</span>
                </span>
                </Link>
                <div className="sm:hidden">
                    <Menu onClick={() => setMenuHidden(!menuHidden)}/>
                </div>
                <div
                    className={`absolute top-0 z-50 bg-primaryColor h-screen 
                w-1/2 ${!menuHidden ? '-translate-x-5' : '-translate-x-80'} 
                translate-y-14 sm:translate-x-0 sm:-translate-y-2.5 flex flex-col sm:static sm:flex sm:h-min sm:flex-row  sm:w-min`}>
                    <ul className="px-5 pt-2 sm:pt-0 sm:flex sm:gap-5">
                        <li className="pt-5"><Link to={'/'}>Home</Link></li>
                        {cookie.access_token == undefined ?
                            <>
                                <li className="mt-5"><Link to={'/login'}>Login</Link></li>
                                <li className="mt-5"><Link to={'/register'}>Register</Link></li>
                            </>
                            : <>
                                <li className="mt-5"><Link to={'/admin/home'}>Admin</Link></li>
                                <li className="mt-5" onClick={handleLogout}><Link to={'/'}>Logout</Link></li>
                            </>}
                    </ul>
                </div>
            </div>
            <ToastContainer/>
        </nav>
    );
}
