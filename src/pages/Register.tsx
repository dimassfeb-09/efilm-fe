import React, {useState} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import showToast from "../components/toast.tsx";
import axios from "axios";


interface ValidationError {
    message: string;
    errors: Record<string, string[]>
}

const Register = () => {

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        try {
            setLoading(true);

            const APIURL = import.meta.env.VITE_URL_API;
            const response = await axios.post(`${APIURL}/auth/register`, {
                username: username,
                password: password,
            })

            if (response.data.code == 200) {
                showToast(true, "Successfully created user.")
                setLoading(false);
            }

        } catch (e) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
                showToast(false, e.response!.data.message)
            } else {
                showToast(false, String(e))
            }

            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center -translate-y-20 items-center h-screen w-full">
            <div className="flex flex-col w-full mx-5 sm:w-1/2 h-1/2 border p-5 justify-center items-center">
                <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                    <div className="text-4xl font-bold">Register</div>

                    <label htmlFor="username" className="mt-5">Username</label>
                    <input className="p-2 mt-2 border" type="text" onChange={(e) => setUsername(e.target.value)}
                           required/>

                    <label htmlFor="password" className="mt-5">Password</label>
                    <input className="p-2 mt-2 border" type="password" onChange={(e) => setPassword(e.target.value)}
                           required/>
                    <button className={`mt-10 border p-3 w-min px-10 rounded-md text-white ${loading ? 'bg-gray-300' : 'bg-primaryColor'}`} disabled={loading}>
                        {!loading ? 'Submit' : 'Loding...'}
                    </button>
                </form>

            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Register;