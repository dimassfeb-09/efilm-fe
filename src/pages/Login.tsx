import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import showToast from "../components/toast.tsx";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


interface ValidationError {
    message: string;
    errors: Record<string, string[]>
}

const Login = () => {

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [cookie, setCookie] = useCookies(['access_token'])
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            if (username == "") {
                throw Error("Username cannot be empty");
            } else if (password == "") {
                throw Error("Password cannot be empty");
            }

            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.post(`${APIURL}/auth/login`, {
                username: username,
                password: password,
            })


            if (response.data.code == 200) {
                const date = new Date();
                date.setTime(date.getTime() + 604800);
                setCookie('access_token', response.data.data.token, {path: '/', expires: date})
                navigate('/admin/home');
                showToast(true, "Successfully login.")
            }

        } catch (e) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
                showToast(false, e.response!.data.message)
                return;
            } else {
                return showToast(false, String(e))
            }

        }
    }

    useEffect(() => {
        const access_token = cookie.access_token;
        console.log(access_token)
        if (access_token != undefined) {
            navigate('/admin/home');
        }
    }, [])

    return (
        <div className="flex justify-center -translate-y-20 items-center h-screen w-full">
            <div className="flex flex-col w-full mx-5 sm:w-1/2 h-1/2 border p-5 justify-center items-center">
                <form className="flex flex-col w-full">
                    <div className="text-4xl font-bold">Masuk</div>

                    <label htmlFor="username" className="mt-5">Username</label>
                    <input className="p-2 mt-2 border" type="text" onChange={(e) => setUsername(e.target.value)}
                           required/>

                    <label htmlFor="password" className="mt-5">Password</label>
                    <input className="p-2 mt-2 border" type="password" onChange={(e) => setPassword(e.target.value)}
                           required/>
                </form>
                <button className="mt-10 border p-3 w-min px-10 rounded-md bg-primaryColor text-white"
                        onClick={handleSubmit}>Login
                </button>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Login;